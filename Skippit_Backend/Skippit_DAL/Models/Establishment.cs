using System;
using System.Collections.Generic;
using System.Text;

namespace Skippit_DAL.Models
{
    public class Establishment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string LocationLat { get; set; }
        public string LocationLng { get; set; }
        public List<Item> Menu { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
    }
}
