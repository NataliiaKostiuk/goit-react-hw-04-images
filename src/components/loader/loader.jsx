import { BallTriangle } from 'react-loader-spinner';
import { LoadWraper } from './loader.styled';

export const Loader = () => {
    return (
        <LoadWraper>
          <BallTriangle color="#102fdfdd" height={200} width={200}/>  
        </LoadWraper>
    )
}
   
 