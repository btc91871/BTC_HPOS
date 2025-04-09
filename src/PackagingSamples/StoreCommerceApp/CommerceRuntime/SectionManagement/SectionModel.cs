using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Microsoft.Dynamics.Commerce.Runtime;
using Microsoft.Dynamics.Commerce.Runtime.DataModel;

[DataContract]
public class SectionModel : CommerceEntity
{
    private const string SectionIdColumn = "SECTIONID";
    private const string NameColumn = "NAME";
    private const string DescriptionColumn = "DESCRIPTION";
    private const string CodeColumn = "CODE";
    private const string StatusColumn = "STATUS";
    private const string FloorNumberColumn = "FLOORNUMBER";
    private const string IsOutdoorColumn = "ISOUTDOOR";
    private const string SpecialFeaturesColumn = "SPECIALFEATURES";
    private const string LastUpdatedColumn = "LASTUPDATED";
    private const string OrderIdColumn = "ORDERID";
    private const string CapacityColumn = "CAPACITY";
    private const string StoreColumn = "STORE";
    private const string ChannelIDColumn = "CHANNELID";
    private const string DataareaIDColumn = "DATAAREAID";

    public SectionModel() : base("SectionModel") {

        Name = "";
        SectionId = "";
        Description = "";
        Code = "";
        Status = "";
        FloorNumber = 0;
        IsOutdoor = 0;
        SpecialFeatures = "";
        LastUpdated = "";

    }

    [Key]
    [DataMember]
    [Column(SectionIdColumn)]
    public string SectionId
    {
        get { return (string)this[SectionIdColumn]; }
        set { this[SectionIdColumn] = value; }
    }

    [DataMember]
    [Column(NameColumn)]
    public string Name
    {
        get { return (string)this[NameColumn]; }
        set { this[NameColumn] = value; }
    }

    [DataMember]
    [Column(DescriptionColumn)]
    public string Description
    {
        get { return (string)this[DescriptionColumn]; }
        set { this[DescriptionColumn] = value; }
    }

    [DataMember]
    [Column(CodeColumn)]
    public string Code
    {
        get { return (string)this[CodeColumn]; }
        set { this[CodeColumn] = value; }
    }

    [DataMember]
    [Column(StatusColumn)]
    public string Status
    {
        get { return (string)this[StatusColumn]; }
        set { this[StatusColumn] = value; }
    }

    [DataMember]
    [Column(FloorNumberColumn)]
    public int? FloorNumber
    {
        get { return (int?)this[FloorNumberColumn]; }
        set { this[FloorNumberColumn] = value; }
    }

    [DataMember]
    [Column(IsOutdoorColumn)]
    public int IsOutdoor
    {
        get { return (int)(this[IsOutdoorColumn]); }
        set { this[IsOutdoorColumn] = value; }
    }

    [DataMember]
    [Column(SpecialFeaturesColumn)]
    public string SpecialFeatures
    {
        get { return (string)this[SpecialFeaturesColumn]; }
        set { this[SpecialFeaturesColumn] = value; }
    }

    [DataMember]
    [Column(LastUpdatedColumn)]
    public string LastUpdated
    {
        get { return (string)(this[LastUpdatedColumn]); }
        set { this[LastUpdatedColumn] = value; }
    }

    [DataMember]
    [Column(OrderIdColumn)]
    public string OrderId
    {
        get { return (string)(this[OrderIdColumn]); }
        set { this[OrderIdColumn] = value; }
    }


    [DataMember]
    [Column(CapacityColumn)]
    public string Capacity
    {
        get { return (string)(this[CapacityColumn]); }
        set { this[CapacityColumn] = value; }
    }
  

    [DataMember]
    [Column(StoreColumn)]
    public string Store
    {
        get { return (string)(this[StoreColumn]); }
        set { this[StoreColumn] = value; }
    }
  

    [DataMember]
    [Column(ChannelIDColumn)]
    public string ChannelID
    {
        get { return (string)(this[ChannelIDColumn]); }
        set { this[ChannelIDColumn] = value; }
    }
  

    [DataMember]
    [Column(DataareaIDColumn)]
    public string DataareaID
    {
        get { return (string)(this[DataareaIDColumn]); }
        set { this[DataareaIDColumn] = value; }
    }
  
}
