using System;
using System.Reflection;

class Program{
    static void Main(String[] args){
        Assembly asm = Assembly.LoadFrom(args[0]);
        Type[] types;
        bool isPlugin = false;
        try
        {
            types = asm.GetTypes();
            foreach (Type type in types)
            {
                if (type.Name.Contains("Darcy"))
                {
                    Console.WriteLine("is plugin");
                    isPlugin = false;
                    break;
                }
            }

            if (!isPlugin)
            {
                Console.WriteLine("Is not plugin");
            }
            Console.WriteLine("good");

        }
        catch (ReflectionTypeLoadException ex)
        {
            foreach (Exception exSub in ex.LoaderExceptions)
            {
                if (exSub.ToString().Contains("Darcy"))
                {
                    Console.WriteLine("Is plugin");
                    isPlugin = true;
                    break;
                }
            }
            if (!isPlugin)
            {
                Console.WriteLine("Is not plugin");
            }
            Console.WriteLine("bad");
            foreach (Exception exSub in ex.LoaderExceptions)
            {
                String str = exSub.ToString();
                int pair1 = 0;
                int pair2 = 0;
                for (int i = 0; i < str.Length; i++)
                {
                    char c = str[i];
                    if (c.Equals('\''))
                    {
                        if (pair1 == 0)
                        {
                            pair1 = i;
                        }
                        else if (pair2==0)
                        {
                            pair2 = i;
                        }
                    }
                }
                Console.WriteLine(str.Substring(pair1+1,pair2-pair1-1));
            }

            Console.WriteLine("Errors:");
            foreach (Exception exSub in ex.LoaderExceptions)
            {
                Console.WriteLine(exSub.ToString());
            }
        }

    }
}