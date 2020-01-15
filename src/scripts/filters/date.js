export default (value) => {
    if(value){
        let date;
        (value.includes(':')) ?  date = new Date(value) : date = new Date(value + ' 12:00') ;
        return date.toLocaleString(['es-MX'], {month: 'short', day: '2-digit', year: 'numeric'})
    }else{
        return 'Sin fecha'
    }
  }
  