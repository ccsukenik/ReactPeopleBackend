using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactPeopleBackend.Data;
using ReactPeopleBackend.Web.Models;

namespace ReactPeopleBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private string _connectionString;

        public HomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleDataRepository(_connectionString);
            return repo.GetPeople();
        }

        [Route("addperson")]
        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PeopleDataRepository(_connectionString);
            repo.AddPerson(person);
        }

        [Route("deleteall")]
        [HttpPost]
        public void DeleteAll(DeleteAllViewModel vm)
        {
            var repo = new PeopleDataRepository(_connectionString);
            repo.DeleteAll(vm.IDs);
        }

        [Route("delete")]
        [HttpPost]
        public void Delete(Person p)
        {
            var repo = new PeopleDataRepository(_connectionString);
            repo.DeletePerson(p.ID);
        }

        [Route("updateperson")]
        [HttpPost]
        public void UpdatePerson(Person p)
        {
            var repo = new PeopleDataRepository(_connectionString);
            repo.UpdatePerson(p);
        }
    }
}