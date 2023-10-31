
const constructErrorMessage = ( { errorCode, elementObj } ) => {
    let errorMessage;
    errorCode == '001' ? errorMessage = `Please fill in ${ getFieldNames( findMissingRequiredFields( elementObj ) ) }, field(s) required` :  // (Code 001) // Missing essential fields
    errorCode == '002' ? errorMessage = 'Passwords do not match' :  // (Code 002) // Passwords do not match
    errorMessage = ``;  // (N/A) // General error
    return errorMessage
}

const styleErrorFields = ( { elements }, root ) => {
    setDefaultFieldStyles( root )
    elements.forEach( element => { element.classList.add( "error-field" ) });
}

const getFieldNames = ( { keys } ) => {
    const names = [ 'First Name', 'Date Of Birth' ];
    const nameList = keys.map( key => names.find( name => key.charAt(0) == name.charAt(0).toLowerCase() ))
    return nameList.length > 1 ? nameList.join(" and ") : nameList[0];
}

const findMissingRequiredFields = ( { firstName, dob } ) => {
    const missingFields = {};
    missingFields.keys = [];
    missingFields.elements = [];
    for(let [fieldName, fieldInp] of Object.entries( { firstName, dob } )) {
        if( !fieldInp.value ){
            missingFields.keys.push( fieldName );
            missingFields.elements.push( fieldInp )
        }
    }
    return missingFields
}

const setDefaultFieldStyles = ( root ) => {
    const fields = Array.from( root.querySelector('.input-area').children )
    fields.forEach( ( element ) => { if( element.classList.contains( "error-field" ) ){ element.classList.remove( "error-field" ) } } )
}

const errorHandlers = { constructErrorMessage, getFieldNames, styleErrorFields, findMissingRequiredFields, setDefaultFieldStyles }

export default errorHandlers;