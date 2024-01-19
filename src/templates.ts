import { TxInputType, TxOutputType, TxTemplate } from './types';

export default [
  {
    code: 'p2pkh_2i-2o',
    name: 'Simple P2PKH',
    inputs: [{ type: TxInputType.P2PKH }, { type: TxInputType.P2PKH }],
    outputs: [{ type: TxOutputType.P2PKH }, { type: TxOutputType.P2PKH }],
    tags: ['Non-SegWit'],
  },
  {
    code: 'p2wpkh_2i-2o',
    name: 'Simple P2WPKH',
    inputs: [{ type: TxInputType.P2WPKH }, { type: TxInputType.P2WPKH }],
    outputs: [{ type: TxOutputType.P2WPKH }, { type: TxOutputType.P2WPKH }],
    tags: ['SegWit'],
  },
  {
    code: 'multisig_2-3_segwit_1i-2o',
    name: 'Multi-sig 2-of-3 Segwit',
    inputs: [{ type: TxInputType.P2WSH_2o3 }],
    outputs: [{ type: TxOutputType.P2WPKH }, { type: TxOutputType.P2WPKH }],
    tags: ['SegWit', 'Multi-sig'],
  },
] as TxTemplate[];
