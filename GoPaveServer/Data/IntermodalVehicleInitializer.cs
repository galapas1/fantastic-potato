using GoPaveServer.Models;
using System.Linq;

namespace GoPaveServer.Data
{
    public static class IntermodalVehicleInitializer
    {
        public static void Initialize(IntermodalVehicleContext context)
        {
            context.Database.EnsureCreated();
            if(context.IntermodalVehicles.Any()) {
                return;
            }

            var vehicles = new IntermodalVehicle[]
            {
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Forklift - Clarklift C500/Y800CH",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 566,
                                      ContactPressure   = 80,
                                      GrossWeight       = 190653,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-23.1",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Forklift - Clarklift C500/Y950 CH",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 647,
                                      ContactPressure   = 80,
                                      GrossWeight       = 217937,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-23.1",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Handler - Kalmar LM",
                                      NumberOfWheels    = 1,
                                      ContactArea       = 746,
                                      ContactPressure   = 130,
                                      GrossWeight       = 204168,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0",
                                      YAxleCoords       = "0",
                                      UnitType          = "US",
                                      CanEdit           = false
                },               
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Aerial Lift - Marathon Letoureau Model 2682",
                                      NumberOfWheels    = 1,
                                      ContactArea       = 1443,
                                      ContactPressure   = 80,
                                      GrossWeight       = 243032,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0",
                                      YAxleCoords       = "0",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Straddle Carrier - Marathon Letoureau SST 100",
                                      NumberOfWheels    = 1,
                                      ContactArea       = 1146,
                                      ContactPressure   = 95,
                                      GrossWeight       = 229200,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0",
                                      YAxleCoords       = "0",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Transtainer Crane - Paceco RT Transtainer",
                                      NumberOfWheels    = 1,
                                      ContactArea       = 969,
                                      ContactPressure   = 124,
                                      GrossWeight       = 252960,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0",
                                      YAxleCoords       = "0",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Generic - Straddle Carrier",
                                      NumberOfWheels    = 1,
                                      ContactArea       = 260,
                                      ContactPressure   = 110,
                                      GrossWeight       = 60211,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0",
                                      YAxleCoords       = "0",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Truck - Taylor TEC - 950L",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 564,
                                      ContactPressure   = 94,
                                      GrossWeight       = 223225,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-28.1",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Truck - Taylor TEC - 155H",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 157,
                                      ContactPressure   = 110,
                                      GrossWeight       = 72716,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-28.2",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Truck - Taylor TEC - 155L",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 154,
                                      ContactPressure   = 110,
                                      GrossWeight       = 71326,
                                      GearConfiguration = GearTypes.Dual,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-28.2",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Handler - Taylor TYTC - 1100S",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 627,
                                      ContactPressure   = 108,
                                      GrossWeight       = 285120,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-28.1",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                 new IntermodalVehicle{UserID = 0,
                                      Name              = "Forklift - Valmet TD 1812",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 309,
                                      ContactPressure   = 80,
                                      GrossWeight       = 104084,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-26.4",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                 new IntermodalVehicle{UserID = 0,
                                      Name              = "Container Handler - Valmet TD 4212",
                                      NumberOfWheels    = 2,
                                      ContactArea       = 613,
                                      ContactPressure   = 80,
                                      GrossWeight       = 206484,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0,0",
                                      YAxleCoords       = "0,-26.4",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Wheel Loader - CAT 986H",
                                      NumberOfWheels    = 4,
                                      ContactArea       = 172,
                                      ContactPressure   = 90,
                                      GrossWeight       = 130358,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0,0,125,125",
                                      YAxleCoords       = "0,-150,0,-150",
                                      UnitType          = "US",
                                      CanEdit           = false
                },
                new IntermodalVehicle{UserID = 0,
                                      Name              = "Wheel Loader - CAT 993K",
                                      NumberOfWheels    = 4,
                                      ContactArea       = 254,
                                      ContactPressure   = 200,
                                      GrossWeight       = 427789,
                                      GearConfiguration = GearTypes.Single,
                                      XAxleCoords       = "0,158,0,158",
                                      YAxleCoords       = "0,0,-232,-232",
                                      UnitType          = "US",
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
