import * as C from './styles.js';

const InfoItem = ({label, value}) => {

  return (
    <C.Container>
      <C.Label>{label}</C.Label>
      <C.Value>{value}</C.Value>
    </C.Container>
  )
  
}


export default InfoItem;