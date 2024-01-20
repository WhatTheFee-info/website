import { TxInputType, TxOutputType, TxTemplate } from './types';

export default [
  // Non segwit
  {
    code: 'p2pkh_1i-2o',
    name: 'Simple payment',
    inputs: [{ type: TxInputType.P2PKH }],
    outputs: [{ type: TxOutputType.P2PKH }, { type: TxOutputType.P2PKH }],
    tags: ['Non-SegWit'],
  },
  {
    code: 'p2pkh_2i-2o',
    name: 'Typical payment',
    inputs: [{ type: TxInputType.P2PKH }, { type: TxInputType.P2PKH }],
    outputs: [{ type: TxOutputType.P2PKH }, { type: TxOutputType.P2PKH }],
    tags: ['Non-SegWit'],
  },
  // Segwit payments
  {
    code: 'p2wpkh_1i-2o',
    name: 'Simple payment',
    inputs: [{ type: TxInputType.P2WPKH }],
    outputs: [{ type: TxOutputType.P2WPKH }, { type: TxOutputType.P2WPKH }],
    tags: ['SegWit'],
  },
  {
    code: 'p2wpkh_2i-2o',
    name: 'Typical payment',
    inputs: [{ type: TxInputType.P2WPKH }, { type: TxInputType.P2WPKH }],
    outputs: [{ type: TxOutputType.P2WPKH }, { type: TxOutputType.P2WPKH }],
    tags: ['SegWit'],
  },
  // Taproot payments
  {
    code: 'p2tr_1i-2o',
    name: 'Simple payment',
    inputs: [{ type: TxInputType.P2TR }],
    outputs: [{ type: TxOutputType.P2TR }, { type: TxOutputType.P2TR }],
    tags: ['Taproot'],
  },
  {
    code: 'p2tr_2i-2o',
    name: 'Typical payment',
    inputs: [{ type: TxInputType.P2TR }, { type: TxInputType.P2TR }],
    outputs: [{ type: TxOutputType.P2TR }, { type: TxOutputType.P2TR }],
    tags: ['Taproot'],
  },
  // Multi-sig
  {
    code: 'multisig_2-3_segwit_1i-2o',
    name: 'Multi-sig 2-of-3',
    inputs: [{ type: TxInputType.P2WSH_2o3 }],
    outputs: [{ type: TxOutputType.P2WPKH }, { type: TxOutputType.P2WPKH }],
    tags: ['SegWit', 'Multi-sig'],
  },
  // Lightning
  {
    code: 'ln_channel_open',
    name: 'Lightning Network channel open',
    inputs: [{ type: TxInputType.P2WPKH }, { type: TxInputType.P2WPKH }],
    outputs: [{ type: TxOutputType.P2WSH }, { type: TxOutputType.P2WSH }],
    tags: ['SegWit', 'Multi-sig', 'LN'],
  },
  {
    code: 'ln_channel_open_dual',
    name: 'Lightning Network dual channel open',
    inputs: [{ type: TxInputType.P2WPKH }, { type: TxInputType.P2WPKH }],
    outputs: [
      { type: TxOutputType.P2WSH },
      { type: TxOutputType.P2WSH },
      { type: TxOutputType.P2WSH },
    ],
    tags: ['SegWit', 'Multi-sig', 'LN'],
  },
] as TxTemplate[];
