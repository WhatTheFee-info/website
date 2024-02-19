import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import {
  TxTemplateInput,
  TxInputType,
  TxTemplateOutput,
  TxTemplate,
  TxOutputType,
} from '../../types';
import { Cube, Import, PlusCircle, XmarkCircle } from 'iconoir-react';
import Select from '../components/Select';
import Input from '../components/Input';
import { calcaulteSize } from '../../services/transaction.service';
import TxTemplateHealthIcon from '../components/TxTemplate/TxTemplateHealthIcon';

type TxInput = TxTemplateInput & {
  amount: number;
};
type TxOutput = TxTemplateOutput & {};

export default function CustomTX() {
  const [inputs, setInputs] = useState<TxTemplateInput[]>([]);
  const [outputs, setOutputs] = useState<TxTemplateOutput[]>([]);
  const [txSize, setTxSize] = useState<number>(0);

  // calculate size
  useEffect(() => {
    const txTemplate: TxTemplate = {
      code: 'custom',
      name: 'custom',
      inputs: inputs,
      outputs: outputs,
    };
    setTxSize(calcaulteSize(txTemplate));
  }, [inputs, outputs]);

  //#region Inputs
  function handleAddInputClick() {
    const newInput: TxInput = {
      type: TxInputType.P2PKH,
      additionalVBytes: 0,
      amount: 0,
    };
    setInputs([...inputs, newInput]);
  }

  function handleDeleteInput(indexToDelete: number) {
    const updatedInputs = [...inputs];
    updatedInputs.splice(indexToDelete, 1);
    setInputs(updatedInputs);
  }
  //#endregion Inputs

  //#region Outputs
  function handleAddOutputClick() {
    const newOutput: TxOutput = {
      type: TxOutputType.P2PKH,
      additionalVBytes: 0,
    };
    setOutputs([...outputs, newOutput]);
  }

  function handleDeleteOutput(indexToDelete: number) {
    const updatedOutputs = outputs.splice(indexToDelete, 1);
    setOutputs(updatedOutputs);
  }
  //#endregion Outputs

  return (
    <div className="mx-auto ">
      <h1 className="my-2">Custom Transaction Template</h1>
      <p className="mb-10">
        Build your custom transaction template to calculate the fees and
        economic health.
      </p>
      <Button>
        <Import className="inline-block" />
        Import from transaction hexadecimal
      </Button>
      <div className="flex flex-row place-content-evenly">
        <Card className="border flex-1">
          <h2 className="text-xl font-bold">Inputs</h2>
          <div className="flex flex-col">
            {inputs.map((input, index) => (
              <div className="flex flex-row items-center my-1">
                <span className="rounded-full size-6 leading-6 border border-slate-600 text-slate-600 text-center text-sm me-1">
                  {`#${index}`}
                </span>
                <Select
                  value={input.type}
                  items={Object.values(TxInputType).map((txInputType) => ({
                    value: txInputType,
                    display: txInputType,
                  }))}
                />
                <Input className="text-right" />
                <span
                  title="Delete input"
                  className="block cursor-pointer justify-self-end"
                  onClick={() => handleDeleteInput(index)}
                >
                  <XmarkCircle />
                </span>
              </div>
            ))}
          </div>
          <Button onClick={handleAddInputClick}>
            <PlusCircle className="inline-block" /> Add input
          </Button>
        </Card>
        <Card className="border flex-1">
          <h2 className="text-xl font-bold">Outputs</h2>
          <div className="flex flex-col">
            {outputs.map((output, index) => (
              <div className="flex flex-row items-center my-1">
                <span className="rounded-full size-6 leading-6 border border-slate-600 text-slate-600 text-center text-sm me-1">
                  {`#${index}`}
                </span>
                <Select
                  value={output.type}
                  items={Object.values(TxOutputType).map((txOutputType) => ({
                    value: txOutputType,
                    display: txOutputType,
                  }))}
                />
                <span
                  title="Delete output"
                  className="block cursor-pointer justify-self-end"
                  onClick={() => handleDeleteOutput(index)}
                >
                  <XmarkCircle />
                </span>
              </div>
            ))}
          </div>
          <Button onClick={handleAddOutputClick}>
            <PlusCircle className="inline-block" /> Add output
          </Button>
        </Card>
      </div>
      <div>
        <h2 className="text-xl font-bold mt-4">Economic health</h2>
        <Card className="flex flex-row">
          <div className="flex-1 text-left me-2">
            <span title="Transaction size">
              <Cube className="inline-block ms-1" />
            </span>
            {txSize} vBytes
          </div>
          <div className="flex-1 border-x px-2 border-slate-500">
            <h3 className="font-bold text-center">Median next block</h3>
            <div className="flex flex-row">
              <TxTemplateHealthIcon className={'bg-red-600'} percent={0.05} />
              <span>9999 sats/vB</span>
            </div>
          </div>
          <div className="flex-1 border-x px-2  border-slate-500">
            <h3 className="font-bold text-center">Minimum next block</h3>
            <div className="flex flex-row">
              <TxTemplateHealthIcon className={'bg-red-600'} percent={0.05} />
              <span>9999 sats/vB</span>
            </div>
          </div>
          <div className="flex-1 border-x px-2 border-slate-500">
            <h3 className="font-bold text-center">Next hour</h3>
            <div className="flex flex-row">
              <TxTemplateHealthIcon className={'bg-lime-600'} percent={0.001} />
              <span>9999 sats/vB</span>
            </div>
          </div>
          <div className="flex-1 border-x px-2 border-slate-500">
            <h3 className="font-bold text-center">Custom</h3>
            <div className="flex flex-row">
              <TxTemplateHealthIcon className={'bg-lime-600'} percent={0.001} />
              <span>9999 sats/vB</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
