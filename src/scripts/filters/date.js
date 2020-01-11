export default (value) => {
    if(value){
        const date = new Date(value + ' 12:00')
        return date.toLocaleString(['es-MX'], {month: 'short', day: '2-digit', year: 'numeric'})
    }else{
        return 'Sin fecha'
    }
  }
  