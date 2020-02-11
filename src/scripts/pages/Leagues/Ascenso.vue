<template>
  <div class="section">
    <div class="container">
      <div class="leagues">
        <div class="columns">
          <div class="column">
            <p class="title">España</p>
            <table class="table">
              <tbody>
                <tr v-for="(artist, index) in spain" :key="artist.points">
                  <td v-text="index + 1"></td>
                  <th v-text="artist.name"></th>
                  <td v-if="artist.city" v-text="artist.city"></td>
                  <td v-text="artist.points"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="column">
            <p class="title">Chile</p>
            <table class="table">
              <tbody>
                <tr v-for="(artist, index) in chile" :key="artist.points">
                  <td v-text="index + 1"></td>
                  <th v-text="artist.name"></th>
                  <td v-if="artist.city" v-text="artist.city"></td>
                  <td v-text="artist.points"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p class="title">Argentina</p>
            <table class="table">
              <tbody>
                <tr v-for="(artist, index) in argentina" :key="artist.points">
                  <td v-text="index + 1"></td>
                  <th v-text="artist.name"></th>
                  <td v-if="artist.city" v-text="artist.city"></td>
                  <td v-text="artist.points"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="column">
            <p class="title">México</p>
             <table class="table">
              <tbody>
                <tr v-for="(artist, index) in mexico" :key="artist.points">
                  <td v-text="index + 1"></td>
                  <th v-text="artist.name"></th>
                  <td v-if="artist.city" v-text="artist.city"></td>
                  <td v-text="artist.points"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="league"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      chile:[
        {name: 'JOKKER', city: '', points: '95,450'},
        {name: 'JOQERR', city: '', points: '81,800'},
        {name: 'RODAMIENTO', city: '', points: '68,100'},
        {name: 'ESEZETA', city: '', points: '65,933'},
        {name: 'ANUBIS', city: '', points: '49,800'},
        {name: 'ELEMENTAL', city: '', points: '34,450'},
        {name: 'RACSO', city: '', points: '32,850'},
        {name: 'RATA', city: '', points: '29,350'},
        {name: 'PLETS', city: '', points: '28,483'},
        {name: 'WOLF', city: '', points: '27,500'},
      ],
      spain:[
        {name: 'MNAK', city: 'Ciudad Real', points: '104,750'},
        {name: 'GAZIR', city: 'Asturias', points: '103,550'},
        {name: 'SWEET PAIN', city: 'Sevilla', points: '91,900'},
        {name: 'TIRPA', city: 'Málaga', points: '74,300'},
        {name: 'JESÚS LC', city: 'MÁLAGA', points: '60,400'},
        {name: 'BOTTA', city: 'Asturias', points: '47,750'},
        {name: 'VIVI', city: 'Murcia', points: '43,150'},
        {name: 'AIGOR', city: 'País Vasco', points: '36,160'},
        {name: 'HANDER', city: 'VALENCIA', points: '34,700'},
        {name: 'XINAKO', city: 'Barcelona', points: '30,050'},
      ],
      argentina:[
        {name: 'WOLF', city: 'CAPITAL FEDERAL', points: '100,400'},
        {name: 'MECHA', city: 'CÓRDOBA', points: '53,900'},
        {name: 'ZAINA', city: 'BUENOS AIRES', points: '47,600'},
        {name: 'SPEKTRO', city: 'MONTEVIDEO', points: '32,450'},
        {name: 'PINGÜI', city: 'CHUBUT', points: '24,100'},
        {name: 'HARRY', city: 'MALDONADO', points: '21,750'},
        {name: 'TUQU', city: 'BUENOS AIRES', points: '21,700'},
        {name: 'DOZER', city: 'BUENOS AIRES', points: '19,200'},
        {name: 'ROMA', city: 'CAPITAL FEDERAL', points: '18,750'},
        {name: 'SFJ', city: 'LAVALLEJA', points: '17,000'},
      ],
      mexico:[
        {name: 'B-ONE', city: 'GUADALAJARA', points: '123,400'},
        {name: 'SKIPER', city: 'MONTERREY', points: '113,500'},
        {name: 'GARZA', city: 'GUADALAJARA', points: '108,500'},
      ]
    }
  }
}
</script>

<style>

</style>