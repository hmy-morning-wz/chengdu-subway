/**
 * Created by louis on 17-3-6.
 */
var ecurve = require('ecurve');

var BigInteger = require('bigi');

var SECP256K1 = ecurve.getCurveByName('secp256k1');
//HmacSHA1
//var createHmac = require('create-hmac')
//var typeforce = require('typeforce')
//var types = require('./types')


//var ECSignature =require('ecdsa').ECSignature;



var N_OVER_TWO = SECP256K1.n.shiftRight(1)

function sign (hash, d) {
    // typeforce(types.tuple(types.Hash256bit, types.BigInt), arguments)

    var x = d.toBuffer(32)
    var e = BigInteger.fromBuffer(hash)
    var n = SECP256K1.n
    var G = SECP256K1.G

    var r, s
    do{
    var k = d.add(BigInteger.ONE);
    k = k.modInverse(n);
    //deterministicGenerateK(hash, x, function (k) {
        //console.log("k="+k.toString(16));
        var Q = G.multiply(k)

        if (SECP256K1.isInfinity(Q)) continue

        r = Q.affineX.mod(n)
        if (r.signum() === 0) continue

        s = k.modInverse(n).multiply(e.add(d.multiply(r))).mod(n)
        if (s.signum() === 0) continue

    //    return true
    //})
    }  while (s.equals(BigInteger.ZERO));

    // enforce low S values, see bip62: 'low s values in signatures'
    if (s.compareTo(N_OVER_TWO) > 0) {
        s = n.subtract(s)
    }

    return {r,s}
}

function verify (hash, signature, Q) {
    /*  typeforce(types.tuple(
     types.Hash256bit,
     types.ECSignature,
     types.ECPoint
     ), arguments)
     */
    var n = SECP256K1.n
    var G = SECP256K1.G

    var r = signature.r
    var s = signature.s

    // 1.4.1 Enforce r and s are both integers in the interval [1, n − 1]
    if (r.signum() <= 0 || r.compareTo(n) >= 0) return false
    if (s.signum() <= 0 || s.compareTo(n) >= 0) return false

    // 1.4.2 H = Hash(M), already done by the user
    // 1.4.3 e = H
    var e = BigInteger.fromBuffer(hash)

    // Compute s^-1
    var sInv = s.modInverse(n)

    // 1.4.4 Compute u1 = es^−1 mod n
    //               u2 = rs^−1 mod n
    var u1 = e.multiply(sInv).mod(n)
    var u2 = r.multiply(sInv).mod(n)

    // 1.4.5 Compute R = (xR, yR)
    //               R = u1G + u2Q
    var R = G.multiplyTwo(u1, Q, u2)

    // 1.4.5 (cont.) Enforce R is not at infinity
    if (SECP256K1.isInfinity(R)) return false

    // 1.4.6 Convert the field element R.x to an integer
    var xR = R.affineX

    // 1.4.7 Set v = xR mod n
    var v = xR.mod(n)

    // 1.4.8 If v = r, output "valid", and if v != r, output "invalid"
    return v.equals(r)
}

/**
 * Recover a public key from a signature.
 *
 * See SEC 1: Elliptic Curve Cryptography, section 4.1.6, "Public
 * Key Recovery Operation".
 *
 * http://www.secg.org/download/aid-780/sec1-v2.pdf
 */
function recoverPubKey (e, signature, i) {
    /*typeforce(types.tuple(
     types.BigInt,
     types.ECSignature,
     types.UInt2
     ), arguments)*/

    var n = SECP256K1.n
    var G = SECP256K1.G
    var r = signature.r
    var s = signature.s

    if (r.signum() <= 0 || r.compareTo(n) >= 0) throw new Error('Invalid r value')
    if (s.signum() <= 0 || s.compareTo(n) >= 0) throw new Error('Invalid s value')

    // A set LSB signifies that the y-coordinate is odd
    var isYOdd = i & 1

    // The more significant bit specifies whether we should use the
    // first or second candidate key.
    var isSecondKey = i >> 1

    // 1.1 Let x = r + jn
    var x = isSecondKey ? r.add(n) : r
    var R = SECP256K1.pointFromX(isYOdd, x)

    // 1.4 Check that nR is at infinity
    var nR = R.multiply(n)
    if (!SECP256K1.isInfinity(nR)) throw new Error('nR is not a valid curve point')

    // Compute r^-1
    var rInv = r.modInverse(n)

    // Compute -e from e
    var eNeg = e.negate().mod(n)

    // 1.6.1 Compute Q = r^-1 (sR -  eG)
    //               Q = r^-1 (sR + -eG)
    var Q = R.multiplyTwo(s, G, eNeg).multiply(rInv)

    SECP256K1.validate(Q)

    return Q
}

/**
 * Calculate pubkey extraction parameter.
 *
 * When extracting a pubkey from a signature, we have to
 * distinguish four different cases. Rather than putting this
 * burden on the verifier, Bitcoin includes a 2-bit value with the
 * signature.
 *
 * This function simply tries all four cases and returns the value
 * that resulted in a successful pubkey recovery.
 */
function calcPubKeyRecoveryParam (e, signature, Q) {
    /*  typeforce(types.tuple(
     types.BigInt,
     types.ECSignature,
     types.ECPoint
     ), arguments)*/

    for (var i = 0; i < 4; i++) {
        var Qprime = recoverPubKey(e, signature, i)

        // 1.6.2 Verify Q
        if (Qprime.equals(Q)) {
            return i
        }
    }

    throw new Error('Unable to find valid recovery factor')
}
function getQ(d) {
    var D =d//  BigInteger.fromBuffer(d);
    var G = SECP256K1.G
    var Q = G.multiply(D);
    return Q;
}
module.exports = {
    calcPubKeyRecoveryParam: calcPubKeyRecoveryParam,
    recoverPubKey: recoverPubKey,
    sign: sign,
    verify: verify,
    getQ:getQ,
    curve: SECP256K1
}