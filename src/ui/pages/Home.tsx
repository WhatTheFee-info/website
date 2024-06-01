import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FastArrowRight } from 'iconoir-react';
import { calcaulteSize } from '../../services/transaction.service';
// components
import CustomFeeRateCard from '../components/FeeRate/CustomFeeRateCard';
import FeeRateCard from '../components/FeeRate/FeeRateCard';
import TxTemplateCard from '../components/TxTemplate/TxTemplateCard';
import DeadUTXOCard from '../components/DeadUTXOCard';
import { TxTemplateCardMode } from '../components/TxTemplate/types';
import Card from '../components/Card';

import { TxTemplate } from '../../types';
import { useAppContext } from '../../context/AppContext';
import definedTemplates from '../../templates';
import { useScreenSize } from '../hooks';
import config from '../../config';

export default function Home() {
  const {
    state: { feeStats, customFeeRate },
  } = useAppContext();
  const screenSize = useScreenSize();

  const [simpleTxTemplate, setSimpleTxTemplate] = useState<TxTemplate>();
  const [txCardMode, setTxCardMode] = useState<TxTemplateCardMode>();

  useEffect(() => {
    const simpleTxTem = definedTemplates.find(
      (template) => template.code == 'p2wpkh_1i-2o',
    );

    if (simpleTxTem) {
      // now calculate size
      simpleTxTem.sizeVB = calcaulteSize(simpleTxTem);
    }
    setSimpleTxTemplate(simpleTxTem);
  }, [feeStats, customFeeRate]);

  useEffect(() => {
    if (screenSize.width <= config.ui.screenSizeMd) {
      setTxCardMode(TxTemplateCardMode.card);
    } else {
      setTxCardMode(TxTemplateCardMode.row);
    }
  }, [screenSize]);

  return (
    <>
      <section id="fee-rates" className="mb-8">
        <h2 className="text-2xl font-bold">
          Current fees of the Bitcoin network
        </h2>
        <div className="flex flex-col md:flex-row">
          <FeeRateCard
            title="Median for next block 🥵🏃"
            level="high"
            feeRateCode={'medianNextBlock'}
          />
          <CustomFeeRateCard />
        </div>
      </section>

      <section id="dead-utxo" className="mb-8">
        <DeadUTXOCard />
      </section>

      {simpleTxTemplate && (
        <section id="tx-simple-health" className="mb-8">
          <div className="text-right">
            <NavLink to={`/templates`} aria-current="page">
              See more transaction templates
              <FastArrowRight className="inline-block ms-1" />
            </NavLink>
          </div>
          <TxTemplateCard
            key={simpleTxTemplate.code}
            template={simpleTxTemplate}
            mode={txCardMode}
          />
        </section>
      )}

      <section id="tx-custom-simple" className="mb-8">
        <Card className="text-center">
          Build your own transaction. Coming soon...
        </Card>
      </section>
    </>
  );
}
