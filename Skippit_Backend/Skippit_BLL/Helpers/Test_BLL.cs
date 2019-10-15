using Skippit_DAL;
using System;
using System.Collections.Generic;
using System.Text;

namespace Skippit_BLL.Helpers
{
    class Test_BLL : ICrud_BLL
    {
        private static ICrud_DAL read_DAL; 
        public Test_BLL(ICrud_DAL _read_DAL)
        {
            read_DAL = _read_DAL; 
        }
        public void Create()
        {
            throw new NotImplementedException();
        }

        public void Delete()
        {
            throw new NotImplementedException();
        }

        public string Read()
        {
            return read_DAL.Read(); 
        }

        public void Update()
        {
            throw new NotImplementedException();
        }
    }
}
