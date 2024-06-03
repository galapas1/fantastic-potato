using GoPaveServer.Data;
using GoPaveServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Newtonsoft.Json;

namespace GoPaveServer.Controllers
{
    [RouteAttribute("/api/vehicles/")]
    public class IntermodalVehicleController : BaseController
    {
        private readonly IntermodalVehicleContext vehicleContext;

        public IntermodalVehicleController(UserContext              userContext,
                                           IntermodalVehicleContext vehicleContext,
                                           ILoggerFactory           loggerFactory) : base(userContext,
                                                                                          loggerFactory)
        {
            this.vehicleContext = vehicleContext;
        }

        [HttpGet("byUnitType")]
        [Authorize(Policy="IdentityFromJwtToken")]
        public Task<List<IntermodalVehicle>> ListByUser([FromQuery]string unitType)
        {
            User user = GetCurrentUser();
            if(null == user)
            {
                return Task.FromResult(
                    vehicleContext.IntermodalVehicles.Where(v => v.UserID == 0 &&
                                                                 v.UnitType == unitType).ToList()
                );
            }
            return Task.FromResult(
                vehicleContext.IntermodalVehicles.Where(v =>
                    (v.UserID == 0 || v.UserID == user.ID.Value) && v.UnitType == unitType
                ).ToList()
            );
        }

        [HttpGet("{id}")]
        [Authorize(Policy="ValidateJwtToken")]
        public Task<IntermodalVehicle> Load(int id)
        {
            User user = GetCurrentUser();
            return Task.FromResult(
                vehicleContext.IntermodalVehicles.Where(p => p.ID.Value == id &&
                                                             user.ID.Value == p.UserID
                ).Single()
            );
        }

        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Authorize(Policy="ValidateJwtToken")]
        public async Task<object> Save([FromBody]IntermodalVehicle model)
        {
            validate(model);
            User user = GetCurrentUser();

            model.UserID  = user.ID.Value;
            model.CanEdit = true;

            try
            {
                if(model.ID != null)
                {
                    var entity = vehicleContext.IntermodalVehicles.Where(e => e.ID.Value == model.ID.Value &&
                                                                         user.ID.Value == e.UserID);
                    vehicleContext.IntermodalVehicles.Update(model);
                }
                else
                {
                    IntermodalVehicle _v = vehicleContext.IntermodalVehicles.Where(v_ =>
                        v_.Name.Equals(model.Name) && user.ID.Value == v_.UserID
                    ).FirstOrDefault();

                    if (null != _v)
                    {
                        throw new ArgumentException("Vehicle Name must be unique");
                    }

                    model.ID = null;
                    var e = await vehicleContext.AddAsync(model);
                    model.ID = e.Entity.ID;
                }
                await vehicleContext.SaveChangesAsync();

                if(model.ID == null)
                {
                    throw new Exception("unknown error");
                }
            }
            catch(Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
            return Load(model.ID.Value);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy="ValidateJwtToken")]
        public Task<List<IntermodalVehicle>> Remove(int id)
        {
            var user = GetCurrentUser();

            var vehicle = vehicleContext.IntermodalVehicles.Where(p =>
                p.ID.Value == id && user.ID.Value == p.UserID && p.CanEdit
            ).FirstOrDefault();

            if(vehicle != null)
            {
                vehicleContext.IntermodalVehicles.Remove(vehicle);
                vehicleContext.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Invalid Vechile ID");
            }

            return ListByUser(vehicle.UnitType);
        }

        private void validate(IntermodalVehicle model)
        {
            if(String.IsNullOrEmpty(model.UnitType)) {
                throw new ArgumentException("Missing Vechile UnitType");
            }
        }
    }
}
