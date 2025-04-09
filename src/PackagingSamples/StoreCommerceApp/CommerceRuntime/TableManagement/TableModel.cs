using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Microsoft.Dynamics.Commerce.Runtime;
using Microsoft.Dynamics.Commerce.Runtime.DataModel;

namespace Contoso.StoreCommercePackagingSample.CommerceRuntime.TableManagement
{
    [DataContract]
    public class TableModel : CommerceEntity
    {
        private const string TableIdColumn = "BTC_TABLEID";
        private const string TableNameColumn = "TABLENAME";
        private const string CapacityColumn = "CAPACITY";
        private const string IsOccupiedColumn = "ISOCCUPIED";
        private const string IsCheckedOutColumn = "ISCHECKEDOUT";
        private const string IsMergedColumn = "ISMERGED";
        private const string CreatedOnColumn = "CREATEDON";
        private const string RecIdColumn = "RECID";
        private const string DataAreaIdColumn = "DATAAREAID";
        private const string IsBlockedColumn = "ISBLOCKED";
        private const string SectionIDColumn = "SECTIONID";
        private const string TablesInSectionColumn = "TABLESINSECTION";
        private const string ChairCountColumn = "CHAIRCOUNT";

        public TableModel() : base("TableModel")
        {
            TableId = 0;
            TableName = string.Empty;
            Capacity = 0;
            IsOccupied = 0;
            IsCheckedOut = 0;
            IsMerged = 0;
            CreatedOn = "";
            RecId = 0;
            DataAreaId = string.Empty;
            IsBlocked = 0;
            SectionID = "";
        }



        [DataMember]
        [Column(TableIdColumn)]
        public int TableId
        {
                get { return (int)(this[TableIdColumn]); }
                set { this[TableIdColumn] = value; }
        }

        [DataMember]
        [Column(TableNameColumn)]
        public string TableName
        {
            get { return (string)(this[TableNameColumn]); }
            set { this[TableNameColumn] = value; }
        }

        [DataMember]
        [Column(CapacityColumn)]
        public int Capacity
        {
            get { return (int)(this[CapacityColumn]); }
            set { this[CapacityColumn] = value; }
        }

        [DataMember]
        [Column(IsOccupiedColumn)]
        public int IsOccupied
        {
            get { return (int)(this[IsOccupiedColumn]); }
            set { this[IsOccupiedColumn] = value; }
        }

        [DataMember]
        [Column(IsCheckedOutColumn)]
        public int IsCheckedOut
        {
            get { return (int)(this[IsCheckedOutColumn]); }
            set { this[IsCheckedOutColumn] = value; }
        }

        [DataMember]
        [Column(IsMergedColumn)]
        public int IsMerged
        {
            get { return (int)(this[IsMergedColumn]); }
            set { this[IsMergedColumn] = value; }
        }

        [DataMember]
        [Column(CreatedOnColumn)]
        public string CreatedOn
        {
            get { return (string)(this[CreatedOnColumn]); }
            set { this[CreatedOnColumn] = value; }
        }


        [Key]
        [DataMember]
        [Column(RecIdColumn)]
        public Int64 RecId
        {
            get { return (Int64)(this[RecIdColumn]); }
            set { this[RecIdColumn] = value; }
        }

        [DataMember]
        [Column(DataAreaIdColumn)]
        public string DataAreaId
        {
            get { return (string)(this[DataAreaIdColumn]); }
            set { this[DataAreaIdColumn] = value; }
        }

        [DataMember]
        [Column(IsBlockedColumn)]
        public int IsBlocked
        {
            get { return (int)(this[IsBlockedColumn]); }
            set { this[IsBlockedColumn] = value; }
        }

        [DataMember]
        [Column(SectionIDColumn)]
        public string SectionID
        {
            get { return (string)(this[SectionIDColumn]); }
            set { this[SectionIDColumn] = value; }
        }


        [DataMember]
        [Column(TablesInSectionColumn)]
        public int TablesInSection
        {
            get { return (int)(this[TablesInSectionColumn]); }
            set { this[TablesInSectionColumn] = value; }
        }
        

        [DataMember]
        [Column(ChairCountColumn)]
        public int ChairCount
        {
            get { return (int)(this[ChairCountColumn]); }
            set { this[ChairCountColumn] = value; }
        }

    }
}
