import * as C from './styles.js';

const Button = ({label, icon, onClick}) => {

  return (
    <C.Container onClick={onClick}>
      <C.IconArea>
        <C.Icon src={icon} />
      </C.IconArea>
      <C.Label>{label}</C.Label>
    </C.Container>
  )
  
}


export default Button;