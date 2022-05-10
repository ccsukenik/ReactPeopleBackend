using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactPeopleBackend.Data
{
    public class PeopleDataRepository
    {
        private string _connectionString;

        public PeopleDataRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void AddPerson(Person p)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Add(p);
            context.SaveChanges();
        }

        public Person GetPersonByID(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.ID == id);
        }

        public void UpdatePerson(Person p)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Update(p);
            context.SaveChanges();
        }

        public void DeletePerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE ID = {id}");
        }

        public void DeleteAll(List<int> ids)
        {
            using var context = new PeopleDataContext(_connectionString);
            var peopleToDelete = context.People.Where(p => ids.Contains(p.ID));
            context.People.RemoveRange(peopleToDelete);
        }
    }
}
