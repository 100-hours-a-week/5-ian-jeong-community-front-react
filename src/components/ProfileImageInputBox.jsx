import React from "react";
import "./../styles/components/profile-image-input-box.css";
import HelperText from "./HelperText";

const ProfileImageInputBox = (props) => {
    const {type, profileHelperTextVisibility, profileHelperText, profileImage, profileOpacity, addImageFunc} = props;


    if (type == 'new') {
        return (
            <>
                <label id="profile-image-input-text" for="profile-image-input">프로필 사진</label>
                <HelperText visibility={profileHelperTextVisibility} text={profileHelperText}></HelperText>
                            
                    <div id="profile-image-input-box">
                        <input 
                            type="file" 
                            id="profile-image-input" 
                            accept="image/*" 
                            onChange={addImageFunc}    
                            >

                        </input>
                        <div id="cross-col" style={{opacity: profileOpacity}}></div>
                        <div id="cross-row" style={{opacity: profileOpacity}}></div>
                        <img id="profile-image-preview" src={profileImage} alt=""></img>
                    </div>
            </>
        )
    } else {
        return (
            <>
                <label id="profile-image-input-text" for="profile-image-input">프로필 사진</label>
                        
                    <div id="profile-image-input-box">
                        <input type="file" id="profile-image-input" accept="image/*" name="profileImage"></input>
                        <button id="image-edit-btn">변경</button>
                        <img id="profile-image-preview" src="" alt=""></img>
                    </div>
            </>
        );
    }

}

export default ProfileImageInputBox;