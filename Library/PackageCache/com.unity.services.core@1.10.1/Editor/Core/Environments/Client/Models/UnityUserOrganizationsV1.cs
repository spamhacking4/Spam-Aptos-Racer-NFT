//-----------------------------------------------------------------------------
// <auto-generated>
//     This file was generated by the C# SDK Code Generator.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//-----------------------------------------------------------------------------


using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine.Scripting;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Unity.Services.Core.Environments.Client.Http;



namespace Unity.Services.Core.Environments.Client.Models
{
    /// <summary>
    /// UnityUserOrganizationsV1 model
    /// </summary>
    [Preserve]
    [DataContract(Name = "unity.UserOrganizations.v1")]
    internal class UnityUserOrganizationsV1
    {
        /// <summary>
        /// Creates an instance of UnityUserOrganizationsV1.
        /// </summary>
        /// <param name="id">ID of the user</param>
        /// <param name="genesisId">ID of the user as provided by Genesis</param>
        /// <param name="name">Name of the user</param>
        /// <param name="email">The email of the user</param>
        /// <param name="organizations">organizations param</param>
        [Preserve]
        public UnityUserOrganizationsV1(System.Guid id = default, string genesisId = default, string name = default, string email = default, List<UnityUserOrganizationsV1Organizations> organizations = default)
        {
            Id = id;
            GenesisId = genesisId;
            Name = name;
            Email = email;
            Organizations = organizations;
        }

        /// <summary>
        /// ID of the user
        /// </summary>
        [Preserve]
        [DataMember(Name = "id", EmitDefaultValue = false)]
        public System.Guid Id{ get; }
        
        /// <summary>
        /// ID of the user as provided by Genesis
        /// </summary>
        [Preserve]
        [DataMember(Name = "genesisId", EmitDefaultValue = false)]
        public string GenesisId{ get; }
        
        /// <summary>
        /// Name of the user
        /// </summary>
        [Preserve]
        [DataMember(Name = "name", EmitDefaultValue = false)]
        public string Name{ get; }
        
        /// <summary>
        /// The email of the user
        /// </summary>
        [Preserve]
        [DataMember(Name = "email", EmitDefaultValue = false)]
        public string Email{ get; }
        
        /// <summary>
        /// Parameter organizations of UnityUserOrganizationsV1
        /// </summary>
        [Preserve]
        [DataMember(Name = "organizations", EmitDefaultValue = false)]
        public List<UnityUserOrganizationsV1Organizations> Organizations{ get; }
    
        /// <summary>
        /// Formats a UnityUserOrganizationsV1 into a string of key-value pairs for use as a path parameter.
        /// </summary>
        /// <returns>Returns a string representation of the key-value pairs.</returns>
        internal string SerializeAsPathParam()
        {
            var serializedModel = "";

            if (Id != null)
            {
                serializedModel += "id," + Id + ",";
            }
            if (GenesisId != null)
            {
                serializedModel += "genesisId," + GenesisId + ",";
            }
            if (Name != null)
            {
                serializedModel += "name," + Name + ",";
            }
            if (Email != null)
            {
                serializedModel += "email," + Email + ",";
            }
            if (Organizations != null)
            {
                serializedModel += "organizations," + Organizations.ToString();
            }
            return serializedModel;
        }

        /// <summary>
        /// Returns a UnityUserOrganizationsV1 as a dictionary of key-value pairs for use as a query parameter.
        /// </summary>
        /// <returns>Returns a dictionary of string key-value pairs.</returns>
        internal Dictionary<string, string> GetAsQueryParam()
        {
            var dictionary = new Dictionary<string, string>();

            if (Id != null)
            {
                var idStringValue = Id.ToString();
                dictionary.Add("id", idStringValue);
            }
            
            if (GenesisId != null)
            {
                var genesisIdStringValue = GenesisId.ToString();
                dictionary.Add("genesisId", genesisIdStringValue);
            }
            
            if (Name != null)
            {
                var nameStringValue = Name.ToString();
                dictionary.Add("name", nameStringValue);
            }
            
            if (Email != null)
            {
                var emailStringValue = Email.ToString();
                dictionary.Add("email", emailStringValue);
            }
            
            return dictionary;
        }
    }
}
