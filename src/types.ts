export enum Themes {
  light = 'light',
  dark = 'dark',
}

export interface FeesStats {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
  medianNextBlock: number;
}

export enum TxInputType {
  P2PKH = 'p2pkh',
  P2WPKH = 'p2wpkh',
  P2SH_2o3 = 'p2sh_2o3',
  P2WSH_2o3 = 'p2wsh_2o3',
  P2TR = 'p2tr',
}

export enum TxOutputType {
  P2PKH = 'p2pkh',
  P2WPKH = 'p2wpkh',
  P2SH_2o3 = 'p2sh_2o3',
  P2WSH_2o3 = 'p2wsh_2o3',
  P2TR = 'p2tr',
}

export type TxTemplate = {
  code: string;
  name: string;
  inputs: {
    type: TxInputType;
    additionalVBytes?: number;
  }[];
  outputs: {
    type: TxOutputType;
    additionalVBytes?: number;
  }[];
  sizeVB?: number;
  costSats?: {
    fastest: number;
    halfHour: number;
    hour: number;
    economy: number;
    minimum: number;
    median: number;
  };
};
