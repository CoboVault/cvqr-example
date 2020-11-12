import React, {useEffect, useState, Fragment} from 'react';
import '../../styles/index.scss';
import {AnimatedQRCodeV2} from '../AnimatedQRCode';
import {V2} from '@cvbb/qr-protocol/dist';

export const Encoder = () => {
  const [data, setData] = useState('');
  const [qrData, setQrData] = useState<string[]>([]);
  useEffect(() => {
    try {
      setQrData(V2.constructQRCode(data));
    } catch (e) {
      setQrData([]);
    }
  }, [data]);
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
