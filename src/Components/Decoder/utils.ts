import * as bitcoin from 'bitcoinjs-lib';

const bitcoinNetwork = {
  coin: 'bitcoin',
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'bc',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  pubKeyHash: 0x00,
  scriptHash: 0x05,
  wif: 0x80,
};

export const parsePsbt = (psbtString: string) => {
  const psbt = bitcoin.Psbt.fromHex(psbtString);
  const txBuffer = psbt.data.getTransaction();
  const tx = bitcoin.Transaction.fromBuffer(txBuffer);
  const inputs = tx.ins.map((each, index) => {
    const psbtInput = psbt.data.inputs[index];
    const {
      witnessUtxo,
      nonWitnessUtxo,
      finalScriptWitness,
      finalScriptSig,
      bip32Derivation,
      partialSig,
      redeemScript,
      witnessScript,
    } = psbtInput;
    if (!bip32Derivation) {
      throw new Error('invalid psbt, no bip32Derivation found');
    }
    if (!nonWitnessUtxo && !witnessUtxo) {
      throw new Error('invalid psbt, no utxo found');
    }
    let value = 0;
    let inputScript = null;
    let p2ms = null;
    if (redeemScript) {
      inputScript = redeemScript;
    }
    if (witnessScript) {
      inputScript = witnessScript;
    }
    if (nonWitnessUtxo) {
      const transaction = bitcoin.Transaction.fromBuffer(nonWitnessUtxo);
      const out = transaction.outs[each.index];
      value = out.value;
      if (!inputScript) {
        inputScript = out.script;
      }
    }
    if (witnessUtxo) {
      value = witnessUtxo.value;
      if (!inputScript) {
        inputScript = witnessUtxo.script;
      }
    }

    try {
      // @ts-ignore
      p2ms = bitcoin.payments.p2ms({output: inputScript});
    } catch (e) {
      // @ts-ignore
    }

    return {
      txId: each.hash.reverse().toString('hex'),
      index: each.index,
      value,
      hdPath: bip32Derivation.map((item) => {
        return {
          masterFingerprint: item.masterFingerprint.toString('hex'),
          path: item.path,
          pubkey: item.pubkey.toString('hex'),
        };
      }),
      isMultiSign: !!p2ms,
      signStatus: p2ms
        ? `${partialSig ? partialSig.length : 0}-${p2ms.m}-${p2ms.n}`
        : undefined,
      isFinalized: !!finalScriptSig || !!finalScriptWitness,
    };
  });
  const outputs = tx.outs.map((each, index) => {
    const address = bitcoin.address.fromOutputScript(
      each.script,
      bitcoinNetwork,
    );
    const bip32Derivation = psbt.data.outputs[index].bip32Derivation;
    const eachOutput = each as bitcoin.TxOutput;
    const value = eachOutput.value;
    return {
      address,
      value,
      hdPath:
        bip32Derivation &&
        bip32Derivation.map((item) => {
          return {
            masterFingerprint: item.masterFingerprint.toString('hex'),
            path: item.path,
            pubkey: item.pubkey.toString('hex'),
          };
        }),
    };
  });
  return {
    inputs,
    outputs,
  };
};
