using GoPaveServer.Models;
using System.Linq;

namespace GoPaveServer.Data
{
    public static class IntermodalVehicleMetricInitializer
    {
        public static void Initialize(IntermodalVehicleContext context)
        {
            context.Database.EnsureCreated();

            var _vehicles = context.IntermodalVehicles.Where(v => v.UnitType == "METRIC").ToList();
            if(_vehicles.Count > 0)
            {
                return;
            }

            var vehicles = new IntermodalVehicle[]
            {
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Forklift - Clarklift C500/Y800CH",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 3652,
                                      ContactPressure   = 552,
                                      GrossWeight       = 86479,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-58.7",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Forklift - Clarklift C500/Y950 CH",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 4175,
                                      ContactPressure   = 552,
                                      GrossWeight       = 98855,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-58.7",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Handler - Kalmar LM",
                                      NumberOfWheels    = 1,
                                      ContactArea       = 4813,
                                      ContactPressure   = 897,
                                      GrossWeight       = 92609,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0",
                                      YAxleCoords       = "0",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },               
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Aerial Lift - Marathon Letoureau Model 2682",
                                      NumberOfWheels    = 1,
                                      ContactArea       = 9310,
                                      ContactPressure   = 552,
                                      GrossWeight       = 110238,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0",
                                      YAxleCoords       = "0",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Straddle Carrier - Marathon Letoureau SST 100",
                                      NumberOfWheels    = 1,
                                      ContactArea       = 7394,
                                      ContactPressure   = 656,
                                      GrossWeight       = 103964,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0",
                                      YAxleCoords       = "0",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Transtainer Crane - Paceco RT Transtainer",
                                      NumberOfWheels    = 1,
                                      ContactArea       = 6252,
                                      ContactPressure   = 855,
                                      GrossWeight       = 114741,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0",
                                      YAxleCoords       = "0",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Generic - Straddle Carrier",
                                      NumberOfWheels    = 1,
                                      ContactArea       = 1678,
                                      ContactPressure   = 759,
                                      GrossWeight       = 27312,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0",
                                      YAxleCoords       = "0",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Truck - Taylor TEC - 950L",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 3639,
                                      ContactPressure   = 649,
                                      GrossWeight       = 101254,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-71.4",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Truck - Taylor TEC - 155H",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 1013,
                                      ContactPressure   = 759,
                                      GrossWeight       = 32984,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-71.7",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Truck - Taylor TEC - 155L",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 994,
                                      ContactPressure   = 759,
                                      GrossWeight       = 32353,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-71.7",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Handler - Taylor TYTC - 1100S",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 4046,
                                      ContactPressure   = 745,
                                      GrossWeight       = 129329,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-71.4",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                 new IntermodalVehicle{UserID = 0,
                                      Name              = "Forklift - Valmet TD 1812",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 1994,
                                      ContactPressure   = 552,
                                      GrossWeight       = 47212,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-67.1",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                 new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Handler - Valmet TD 4212",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 3955,
                                      ContactPressure   = 552,
                                      GrossWeight       = 93660,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-67.1",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Wheel Loader - CAT 986H",
                                      NumberOfWheels    = 4,
                                      ContactArea       = 1110,
                                      ContactPressure   = 621,
                                      GrossWeight       = 59130,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0,0,317.5,317.5",
                                      YAxleCoords       = "0,-381,0,-381",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Wheel Loader - CAT 993K",
                                      NumberOfWheels    = 4,
                                      ContactArea       = 1639,
                                      ContactPressure   = 1379,
                                      GrossWeight       = 194042,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0,401.4,0,401.4",
                                      YAxleCoords       = "0,0,-589.3,-589.3",
                                      UnitType          = "METRIC",
                                      CanEdit           = false
                }
            };

            foreach (IntermodalVehicle v in vehicles)
            {
                context.IntermodalVehicles.Add(v);
            }
            context.SaveChanges();
        }
    }
}
