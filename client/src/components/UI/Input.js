import styled from 'styled-components'

const InputWrapper = styled.label`
  display: block;
  margin-bottom: 10px;
`

const InputLabel = styled.span`
  display: block;
  margin-bottom: 5px;
`

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: border-color 0.2s ease-in-out;
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`

const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: border-color 0.2s ease-in-out;
  appearance: none;
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`

const Input = (props) => {
  if (props.type === 'select') {
    return (
      <InputWrapper>
        <InputLabel>{props.label}:</InputLabel>
        <SelectField value={props.value} onChange={props.onChange} required>
          {props.children}
        </SelectField>
      </InputWrapper>
    )
  }

  return (
    <InputWrapper>
      <InputLabel>{props.label}:</InputLabel>
      <InputField
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        required
      />
    </InputWrapper>
  )
}

export default Input
