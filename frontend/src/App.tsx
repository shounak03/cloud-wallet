
import axios from 'axios';
import './App.css'
import { Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js' 
function App() {

  async function sendSol(){
      
      const conn = new Connection("https://api.devnet.solana.com")
      //trying to send a transaction
      //creating an instruction
      const ix1 = SystemProgram.transfer({
          fromPubkey: new PublicKey("4KxnYA27maqPBV5VhkA3cYaD4hhDagBEAHDs3Buy23SW"),
          toPubkey: new PublicKey("FdxXrfp26mHbHfPH2iFnCSi6mxUdH827KCGNajHHuHQb"),
          lamports: 0.1 * LAMPORTS_PER_SOL
      })
      
      //added instruction to the transaction.
      const tx = new Transaction().add(ix1);
      
      const {blockhash} = await conn.getLatestBlockhash();
      tx.recentBlockhash = blockhash
      tx.feePayer = new PublicKey("4KxnYA27maqPBV5VhkA3cYaD4hhDagBEAHDs3Buy23SW")
      
      //convert the transaction to a byte
      const serailTx = tx.serialize({
        requireAllSignatures: false,
        verifySignatures: false
      })

      console.log(serailTx)

      /*    this is what gets logged ,txn in bytes\

            Uint8Array(215) [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 3, 49, 110, 151, 127, 17, 119, 34, 84, 212, 251, 186, 105, 24, 244, 237, 24, 57, 190, 102, 68, 225, 253, 8, 117, 208, 154, 62, 26, 24, 252, 207, …][0 … 99][100 … 199][200 … 214]offset: (...)parent: (...)buffer: ArrayBuffer(215)byteLength: 215byteOffset: 0length: 215Symbol(Symbol.toStringTag): "Uint8Array"[[Prototype]]: Uint8Array
      */

      await axios.post("http://localhost:3000/api/v1/txn/sign",{
        message: serailTx,
        retry: false
      })
  }

  return (
   <div>
    <button onClick={sendSol}>send sol</button>
   </div>
  )
}

export default App
