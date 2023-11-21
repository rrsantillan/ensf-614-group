function validation(values){
    let error = {}

    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.user === ""){
        error.user = "User should not be empty";
    }
    else{
        error.user = "";
    }
    
    if (values.password === ""){
        error.password = "Password Should not be empty";
    }
    // else if(!password_pattern.test(values.password)){
    //     error.password = "Password did not match";
    // }
    else{
        error.password = "";
    }
    return error;
}

export default validation;