import placeholderMessage from "../constants/placeholder";
import "./../styles/components/text-input.css";

// 이메일 비번, 비번확인, 닉네임 입력을 다뤄야 함
const TextInput = (props) => {
    let type = props.type;
    const flag = props.flag;

    let id;
    let labelText;
    let placeholder;
    
    if (type == 'email') {
        type = 'text';
        id = 'email-input';

        if (flag) {
            labelText = '이메일*';    
        } else {
            labelText = '이메일';
        }

        placeholder = placeholderMessage.EMAIL_INPUT;

    } else if(type == 'password') {
        type = 'password';
        id = 'password-input';

        if (flag) {
            labelText = '비밀번호*';    
        } else {
            labelText = '비밀번호';
        }

        placeholder = placeholderMessage.PASSWORD_INPUT;

    } else if(type == 'repassword') {
        type = 'password';
        id = 'repassword-input';
        
        if (flag) {
            labelText = '비밀번호 확인*';    
        } else {
            labelText = '비밀번호 확인';
        }

        placeholder = placeholderMessage.REPASSWORD_INPUT;
    } else {
        type = 'text';
        id = 'nickname-input';
        
        if (flag) {
            labelText = '닉네임*';    
        } else {
            labelText = '닉네임';
        }

        placeholder = placeholderMessage.NICKNAME_INPUT;
    }


    return (
        <>
            <label for={id} className="input-label-text">{labelText}</label>
            <input type={type} id={id} className="text-input" name={type} placeholder={placeholder}></input>
        </>
    );
}

export default TextInput;