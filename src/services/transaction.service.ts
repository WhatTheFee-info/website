import { TxInputType, TxOutputType, TxTemplate } from '../types';

/**
 * Calcaulates the size in vBytes
 * https://bitcoinops.org/en/tools/calc-size/
 * @param txTemplate
 * @returns
 */
export function calcaulteSize(txTemplate: TxTemplate): number {
  let totalSize = 0;

  // --- Overhead
  // nVersion
  totalSize += 4;
  // Input count
  totalSize += 1;
  // Output count
  totalSize += 1;
  // nLockTime
  totalSize += 4;
  // Only in transactions spending one or more segwit UTXOs:
  if (txTemplate.inputs.some((input) => isSegWit(input.type))) {
    totalSize += 0.5;
  }

  // --- Inputs
  for (let i = 0; i < txTemplate.inputs.length; i++) {
    const input = txTemplate.inputs[i];

    // Outpoint
    totalSize += 36;
    // scriptSig length
    // 1 vbyte for a scriptSig up to 252 vbytes. Maximum of 3 vbytes for a maximum-length scriptSig (10,000 vbytes)
    totalSize += 1;
    // scriptSig
    switch (input.type) {
      case TxInputType.P2PKH:
        totalSize += 107;
        break;
      case TxInputType.P2SH_2o3:
        totalSize += 254;
        break;
    }
    // nSequence
    totalSize += 4;
    // Witness item count
    if (isSegWit(input.type)) {
      totalSize += 0.25;
    }
    // Witness items
    switch (input.type) {
      case TxInputType.P2WPKH:
        totalSize += 27;
        break;
      case TxInputType.P2WSH_2o3:
        totalSize += 63.5;
        break;
      case TxInputType.P2TR:
        totalSize += 16.5;
        break;
    }
    // additional
    totalSize += input.additionalVBytes ? input.additionalVBytes : 0;
  }

  // --- Outputs
  for (let o = 0; o < txTemplate.outputs.length; o++) {
    const output = txTemplate.outputs[o];

    // nValue
    totalSize += 8;
    // scriptPubKey length
    // 1 vbyte for a script up to 252 vbytes. Maximum of 3 vbytes for a maximum-length script (10,000 vbytes).
    totalSize += 1;
    // scriptPubKey
    switch (output.type) {
      case TxOutputType.P2PKH:
        totalSize += 25;
        break;
      case TxOutputType.P2WPKH:
        totalSize += 22;
        break;
      case TxOutputType.P2SH_2o3:
        totalSize += 23;
        break;
      case TxOutputType.P2WSH_2o3:
        totalSize += 34;
        break;
      case TxOutputType.P2TR:
        totalSize += 34;
        break;
    }
    // additional
    totalSize += output.additionalVBytes ? output.additionalVBytes : 0;
  }

  return totalSize;
}

function isSegWit(inputType: TxInputType): boolean {
  return (
    inputType == TxInputType.P2WPKH ||
    inputType == TxInputType.P2WSH_2o3 ||
    inputType == TxInputType.P2TR
  );
}
