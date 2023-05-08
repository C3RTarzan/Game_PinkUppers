import './styles.scss';
function Input({type, text, name, placeholder, handleOnChange, value, multiple}) {
  return (
    <div className='Form'>
       {text !== undefined ? <span>{text}:</span> : '' } 
        
        <input 
            type={type} 
            name={name} 
            id={name} 
            placeholder={placeholder} 
            onChange={handleOnChange}
            value={value}
            {...(multiple ? (multiple) : '')}
        ></input>
    </div>
  );
}
  
export default Input;