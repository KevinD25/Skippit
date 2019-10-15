using System;
using System.Collections.Generic;
using System.Text;

namespace Skippit_DTO
{
    public class Establishment_DTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string LocationLat { get; set; }
        public string LocationLng { get; set; }
        public List<Item_DTO> Menu { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
    }
}
