import { TxInputType, TxOutputType, TxTemplate } from './types';

export default [
  {
    code: 'p2pkh_1i-2o',
    name: 'Simple P2PKH',
    inputs: [{ type: TxInputType.P2PKH }, { type: TxInputType.P2PKH }],
    outputs: [{ type: TxOutputType.P2PKH }, { type: TxOutputType.P2PKH }],
  },
  {
    code: 'p2wpkh_1i-2o',
    name: 'Simple P2WPKH',
    inputs: [{ type: TxInputType.P2WPKH }, { type: TxInputType.P2WPKH }],
    outputs: [{ type: TxOutputType.P2WPKH }, { type: TxOutputType.P2WPKH }],
  },
] as TxTemplate[];
