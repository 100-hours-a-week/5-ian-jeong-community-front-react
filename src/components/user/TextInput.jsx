import placeholderMessage from "../../constants/placeholder";
import "../../styles/components/user/text-input.css";



const TextInput = (props) => {
    let type = props.type;
    const {validateInput, flag} = props;

    let id;
    let placeholder;
    
    if (type == 'email') {
        type = 'text';
        id = 'email-input';

        placeholder = placeholderMessage.EMAIL_INPUT;

    } else if(type == 'password') {
        type = 'password';
        id = 'password-input';

        placeholder = placeholderMessage.PASSWORD_INPUT;

    } else if(type == 'repassword') {
        type = 'password';
        id = 'repassword-input';

        placeholder = placeholderMessage.REPASSWORD_INPUT;
    } else {
        type = 'text';
        id = 'nickname-input';

        placeholder = placeholderMessage.NICKNAME_INPUT;
    }


    return (
        <>
            <input 
                type={type} 
                id={id} 
                className="text-input" 
                placeholder={placeholder}
                onInput={(e) => validateInput(e.target.value)}
            >

            </input>
        </>
    );
}

export default TextInput;