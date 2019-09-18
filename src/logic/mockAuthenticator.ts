export function createMockAuthenticator(){
  const acceptedUsernames = ['mate', 'jure', 'frane', 'mladen'];
  const acceptedPassword = 'sifra123';
  return function(username: string, password: string){
    return acceptedUsernames.includes(username) && password === acceptedPassword;
  }
}