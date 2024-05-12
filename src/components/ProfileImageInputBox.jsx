import React from "react";
import "./../styles/components/profile-image-input-box.css";
import HelperText from "./HelperText";

const ProfileImageInputBox = (props) => {
    const {type, profileHelperTextVisibility, profileHelperText, profileImage, profileOpacity, addImageFunc} = props;


    if (type == 'new') {
        return (
            <>
                <label id="profile-image-input-text" for="profile-image-input">프로필 사진</label>
                <HelperText visibility={profileHelperTextVisibility} text={profileHelperText} color={"#FF0000"}></HelperText>
                            
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
                        <input 
                            type="file" 
                            id="profile-image-input" 
                            accept="image/*"
                            onChange={addImageFunc}>
                        </input>
                        <label id="image-edit-btn" for="profile-image-input">변경</label>
                        <img id="profile-image-preview" src={profileImage} style={{opacity: 0.55, backgroundColor: "#464646"}} alt=""></img>
                    </div>
            </>
        );
    }

}

export default ProfileImageInputBox;