import React, {useContext, useEffect, useState} from 'react';
import QrReader from 'react-qr-scanner';
import '../../styles/index.scss';
import {extractSingleWorkload} from '@cvbb/bc-ur/dist';
import {V2} from '@cvbb/qr-protocol/dist';

import {Progress} from './Progress';
import {DataTypeContext} from '../DataTypeSelector';

export interface URQRCodeData {
  total: number;
  index: number;
  data: string;
}

export const Decoder = () => {
  const currentDataType = useContext(DataTypeContext);
  const [data, setData] = useState('');
  const [urCodes, setURCodes] = useState<URQRCodeData[]>([]);

  const clear = () => {
    setURCodes([]);
  };

  const processURQRCode = (ur: string) => {
    try {
      const [index, total] = extractSingleWorkload(ur);
      if (urCodes.length > 0) {
        const currentTotal = urCodes[0].total;
        if (total !== currentTotal) {
          clear();
          alert('invalid animated QRCode');
        }
      }
      if (!urCodes.find((item) => item.index === index)) {
        const newCodes = [...urCodes, {index, total, data: ur}];
        setURCodes(newCodes);
        if (newCodes.length === total) {
          setData(
            Buffer.from(
              V2.extractQRCode(newCodes.map((i) => i.data)),
              'hex',
            ).toString(currentDataType),
          );
          clear();
        }
      }
    } catch (e) {
      clear();
      alert('invalid animated QRCode');
    }
  };

  const [decoderIsOpen, setDecoderOpen] = useState(false);

  useEffect(() => {
    if (!decoderIsOpen) {
      clear();
    }
  }, [decoderIsOpen]);

  return (
    <div className="row">
      <div className="col">
        <textarea value={data} onChange={(e) => {}} cols={50} rows={20} />
      </div>
      <div className="col">
        <button
          onClick={() => setDecoderOpen((decoderIsOpen) => !decoderIsOpen)}>
          {decoderIsOpen ? '关闭解码' : '开启解码'}
        </button>
        {decoderIsOpen && (
          <QrReader
            onScan={(data: any) => {
              if (data) {
                console.log(data);
                processURQRCode(data);
              }
            }}
            delay={100}
            style={{width: 250}}
            onError={(e) => {
              console.log(e);
            }}
          />
        )}
        {urCodes[0] && urCodes[0].total > 1 && (
          <Progress progress={urCodes.length} total={urCodes[0].total} />
        )}
      </div>
    </div>
  );
};