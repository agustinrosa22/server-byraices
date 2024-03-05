const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Property = sequelize.define('Property', {
    propertyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    videoLink: {
      type: DataTypes.STRING,
    },
    statusProperty: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    currency: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencyExpenses: {
      type: DataTypes.STRING,
    },
    expenses: {
      type: DataTypes.STRING,
    },
    totalSquareMeters: {
      type: DataTypes.INTEGER,
    },
    coveredSquareMeters: {
      type: DataTypes.INTEGER,
    },
    semiCoveredSquareMeters: {
      type: DataTypes.INTEGER,
    },
    uncovered: {
      type: DataTypes.INTEGER,
    },
    land: {
      type: DataTypes.INTEGER,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    commissionSellerType: {
      type: DataTypes.STRING,
    },
    sellerCommission: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    commissionBuyerType: {
      type: DataTypes.STRING,
    },
    buyerCommission: {
      type: DataTypes.DECIMAL(5, 2),
    },
    availableDate: {
      type: DataTypes.STRING, // Usa STRING en lugar de DATE
      defaultValue: () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
      },
    },
    expirationDate: {
      type: DataTypes.STRING, // Usa STRING en lugar de DATE
      defaultValue: () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
      },
    },
    street: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    departments: {
      type: DataTypes.STRING,
    },
    locality: {
      type: DataTypes.STRING,
    },
    neighborhood: {
      type: DataTypes.STRING,
    },
    privateNeighborhood: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    environments: {
      type: DataTypes.STRING,
    },
    rooms: {
      type: DataTypes.STRING,
    },
    bathrooms: {
      type: DataTypes.STRING,
    },
    toilettes: {
      type: DataTypes.STRING,
    },
    garages: {
      type: DataTypes.STRING,
    },
    propertyState: {
      type: DataTypes.JSON,
      defaultValue: {
        aEstrenar: false,
        enConstruccion: false,
        refaccionado: false,
        aRefaccionar: false,
        excelente: false,
        muyBueno: false,
        bueno: false,
        regular: false,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    floorPlans: {
      type: DataTypes.STRING,
    },
    documentation: {
      type: DataTypes.STRING,
    },
    isForSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isForRent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isUnderDevelopment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    detailsProperty: {
      type: DataTypes.JSON,
      defaultValue: {
        exclusiveContract: false,
        cartel: false,
        financing: false,
        suitableCredit: false,
        commercialSuitable: false,
        professionalSuitable: false,
        suitableForReducedMobility: false,
        pozo: false,
        CountryOrPrivateNeighborhood: false,
      }
    },

    characteristics: {
      type: DataTypes.JSON,
      defaultValue: {
        placard: false,
        parilla: false,
        desayunador: false, 
        orientacionSur: false,
        orientacionOeste: false,
        orientacionNorte: false,
        orientacionEste: false,
        accesoDeCocheraRampaFija: false,
        accesoDeCocheraRampaMovil: false,
        accesoDeCocheraAscensor: false,
        accesoDeCocheraHorizontal: false,
        disposicionContrafrente: false,
        disposicionFrente: false,
        disposicionInterno: false,
        disposicionLateral: false,
        amoblado: false,
        orientacionNoroeste: false, 
        orientacionNoreste: false,
        orientacionSuroeste: false,
        orientacionSureste: false,
        deck: false,
        tipoDeCampoOtro: false,
        tipoDeCampoFruticula: false,
        tipoDeCampoAgricola: false,
        tipoDeCampoChara: false,
        tipoDeCampoCriadero: false,
        tipoDeCampoTambero: false,
        tipoDeCampoFloricultura: false,
        tipoDeCampoForestal: false,
        tipoDeCampoGanadero: false,
        tipoDeCampoHaras: false,
        bodegas: false,
        tipoDeBodegaComercial: false,
        tipoDeBodegaNaveIndustrial: false,
        tipoDeBodegaAlmacen: false,
        biblioteca: false,
        galpon: false,
        sotano: false,
        baulera: false,
        permiteMascota: false,
        aptoTuristico: false,
      }
    },
    amenities: {
        type: DataTypes.JSON,
        defaultValue: {
      aireAcondicionado:false,
      portonAutomatico: false,
      gimnasio:false,
      losaRadiante:false,
      chimenea:false,
      hidromasaje:false,
      seguridad:false,
      pileta:false,
      caldera:false,
      businessCenter:false,
      areaCine:false,
      cisterna: false,
      laundry:false,
      estacionamientoVisitas: false,
      ascensor:false,
      salonUsosMultiples: false,
      areaDeJuegosInfantiles: false,
      canchaTenis:false,
      recepcion:false,
      areasVerdes:false,
      valetParking:false,
      canchaBasquetbol:false,
      canchaFutbol: false,
      canchaPaddle:false,
      solarium:false,
      jardinDeInvierno:false,
      piletaCubierta: false,
      piletaClimatizada:false,
      sauna:false,
      bar: false,
      calefaccion: false,
      // Agrega más amenidades aquí según sea necesario
    }
  },
  environmentsOptions: {
    type: DataTypes.JSON,
    defaultValue: {
  dormitorio:false,
  comedor: false,
  vestidor:false,
  jardin:false,
  baño:false,
  cocina:false,
  living:false,
  patio:false,
  terraza:false,
  estudio:false,
  lavadero:false,
  altillo:false,
  playroom:false,
  lobby:false,
  quincho:false,
  salaDeReuniones:false, 
  balcon:false,
  pileta:false,
  cocina:false,
  toilette:false,
  habitacion:false,
  living:false,
  otro: false,
  // Agrega más amenidades aquí según sea necesario
}
},
services: {
  type: DataTypes.JSON,
  defaultValue: {
electricidad:false,
agua:false,
gas:false,
internet:false,
telefono:false,
desagueCloacal:false,
televisionPorCable:false,
alarma:false,
televisionSatelital:false,
aguaCorriente:false,
// Agrega más amenidades aquí según sea necesario
}
},
    
  });

  return Property;
};
