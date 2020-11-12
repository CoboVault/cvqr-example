import React, {FunctionComponent, useState} from 'react';
import '../../styles/index.scss'

type SupportDataType = 'hex' | 'utf-8' | 'base64'

export const DataTypeContext = React.createContext<SupportDataType>('hex');
export const DataTypeSelector: FunctionComponent = (props) => {
    const [dataType, setDataType] = useState<SupportDataType>('hex');
    return <div className="col">
        <div className="row" style={{width: 300}}>
            <button onClick={() => setDataType('hex')}>Hex</button>
            <button onClick={() => setDataType('utf-8')}>utf8(JSON, String)</button>
            <button onClick={() => setDataType('base64')}>Base64</button>
        </div>
        <p>Current Type: {dataType}</p>
        <DataTypeContext.Provider value={dataType}>
            {props.children}
        </DataTypeContext.Provider>
    </div>
}
