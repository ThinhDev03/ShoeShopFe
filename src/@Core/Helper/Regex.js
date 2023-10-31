class Regexs {
   phone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
   optionalEmail = /^(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})?$/i;
   email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i;
   number = /^\d*\.?\d*$/;
   decimal = /^[0-9]{1,7}(\.[0-9]{1,2})?$/;
   decimalNumber = /^\d+\.?\d+$/;
   className = /^[1-5]*[a-zA-Z]$/;
   password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
}

export default new Regexs();
