import React, {useContext, useEffect, useState} from 'react';
import '../../styles/index.scss';
import {AnimatedQRCodeV2} from '../AnimatedQRCode';
import {V2} from '@cvbb/qr-protocol/dist';
import {DataTypeContext} from '../DataTypeSelector';

export const Encoder = () => {
  const currentDataType = useContext(DataTypeContext);
  const [data, setData] = useState('');
  const [qrData, setQrData] = useState<string[]>([]);
  console.log(currentDataType);
  useEffect(() => {
    try {
      setQrData(
        V2.constructQRCode(Buffer.from(data, currentDataType).toString('hex')),
      );
    } catch (e) {
      setQrData([]);
    }
  }, [data, currentDataType]);
  return (
    <div className="row">
      <div className="col">
        <textarea
          value={data}
          onChange={(e) => {
            setData(e.target.value);
          }}
          cols={50}
          rows={20}
        />
      </div>
      <div className="col">
        <p>UR</p>
        <AnimatedQRCodeV2 data={qrData} />
      </div>
    </div>
  );
};
