import React, { useState } from 'react';
import './App.css'
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from '@mui/material';

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: true,
  }
])

interface ReturnClientDataCompProps {
  data: any
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({ data }) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>
        {JSON.stringify(data, null)}
      </code>
    </pre>
  </>
)

interface ReturnData {
  x: number;
  y: number;
  z: number;
}

const App: React.FC = () => {
  const [clientData, setClientData] = useState<ReturnData | null>(null)

  const handleGetClientData = () => {
    fetchNui<ReturnData>('getClientData').then(retData => {
      console.log('Got return data from client scripts:')
      console.dir(retData)
      setClientData(retData)
    }).catch(e => {
      console.error('Setting mock data due to error', e)
      setClientData({ x: 500, y: 300, z: 200 })
    })
  }

  const user_status = "Solteiro";
  const user_name = 'Matheus Vieira'
  const user_partner = 'Ryan Silva'

  return (
    <div className="nui-wrapper">
      <div className='popup-thing'>
          <div className='title-container'>
            <div>
            <FavoriteIcon fontSize='large' />
            <h1>Sistema de Relacionamentos</h1>
            <FavoriteIcon fontSize='large' />
            </div>
            <h3>Olá, {user_name}!</h3>
          </div>
          <div className='status-container'>
            <span>Seu status atual é {user_status}</span>
            <p>Seu cônjugue atual é {user_partner}</p>
          </div>
          <div className='button-container'>
            <Button variant="contained" endIcon={<FavoriteIcon />}>
              Namorar
            </Button>
            <Button variant="contained" endIcon={<VolunteerActivismIcon />}>
              Noivar
            </Button>
            <Button variant="contained" endIcon={<FavoriteBorderIcon />}>
              Casar
            </Button>
            <Button variant="contained" endIcon={<HeartBrokenIcon />}>
              Separar
            </Button>
          </div>
          {clientData && <ReturnClientDataComp data={clientData} />}
      </div>
    </div>
  );
}

export default App;
