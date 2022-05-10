using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReactPeopleBackend.Data
{
    public class DataContextFactory : IDesignTimeDbContextFactory<PeopleDataContext>
    {
        public PeopleDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactPeopleBackend.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsetings.local.jason", optional: true, reloadOnChange: true).Build();

            return new PeopleDataContext(config.GetConnectionString("ConStr"));
        }
    }
}
