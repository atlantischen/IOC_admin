<template>
  <div class="DeveloPer">
    <div class="header_btns">
      <div class="ovhi mgr3">
        <div class="fr">
          菜单名称 <i></i>
          <el-input
            class="k_input"
            placeholder="请输入菜单名称"
            v-model="searchContent"
          ></el-input
          ><i></i>
          <button class="md_bt_gy"  @click="initD(searchContent)">
            查询
          </button>
        </div>
      </div>
      <div class="Peripheral mt20">
        <div class="ovhi bosa-98ABC2 Peripheral_box">
          <div class="fr Peripheral_line mgr3">
            <button class="md_bt_df" @click="increase()" v-if="form.type==4?false:true">
              添加
            </button>
            <i></i>
            <button class="md_bt_gy" @click="onRemove()">
              删除
            </button>
          </div>
        </div>
        <div class="Authority ovhi">
          <div class="wp25 hp100 Authority_limits fl">
            <el-tree :data="purview" :props="defaultProps" @node-click="handleNodeClick" class="tree" :filter-node-method="filterNode"
            ref="treeu"></el-tree>
          </div>
          <div class="wp75 fl hp100">
            <div class="hp90 wp60 Authority_range ">
                <el-form ref="form" :model="form" label-width="80px" label-position="left" size="medium">
                <el-form-item label="所属系统">
                  <div>园区管理平台</div>
                </el-form-item>    
                <el-form-item label="节点位置" v-if="lopersta" class="Classified">
                  <el-select v-model="layer1" v-if="website1" class="fl wp33">
                  </el-select>
                  <el-select v-model="layer2" v-if="website2" class="fl wp33">
                  </el-select>
                  <el-select v-model="layer3" v-if="website3" class="fl wp33">
                  </el-select>
                </el-form-item>
                <el-form-item :label="first+'名称'">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="first+'code'">
                  <el-input  v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="路径">
                    <el-input v-model="form.component"></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                  <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item label="权限状态">
                  <el-radio-group v-model="form.status">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="显示状态">
                  <el-radio-group v-model="form.visible">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <div class="hp10 wp100 DeveloPer_passage" >
              <div class="sjc  hp100">
                <button class="md_bt_df mgr5" @click="onCancel">
                  取消
                </button>
                <i></i>
                <button class="md_bt_gy mgr5" @click="ondefine()">
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ParkManagement,
  ParkRoleApi,
  ParkModification,
  ParkDelete
} from "@/api/menu";
export default {
  name: "DeveloPer",
  props: {
  },
  // props: ["_show", "_datas", "_type"],
  data() {
    return {
      searchContent: null,
      purview:[],
      first:'目录',
      lopersta:false,
      website1:false,
      website2:false,
      website3:false,
      Increase:false,
      certain:'',
      layer1:'',
      layer2:'',
      layer3:'',
      form: {
        name: '',
        code:'',
        component:'',
        sort:'',
        status:'',
        visible:'',
        icon: '',
        url:'',
      },
      multipartFile:null,
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  watch: {
    
  },
  created() {
    this.initial();
  },
  methods: {
    initial(){
      ParkManagement({
        queryMode: "list",
      }).then(r => {
        if (r.code == 200) {
          this.purview = r.data;
        }
      });
    },
    initD(val){
      this.$refs.treeu.filter(val);
    },
    increase(val){
      this.Increase=true
      if(this.certain==''){
       return this.$message.error('请先勾选需要添加的层级');
      }
      this.form={name: '',component:'',sort:'',status:'',visible:'',icon: ''},
      this.lopersta=false;
    },
    onRemove(){
      console.log(this.certain,'查看删除')
      if(this.certain==''){
        this.$message.error('请先勾选需要删除的层级');
      }else if(!this.certain.children ){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ParkDelete({ids:this.certain.id}).then(r => {
            if (r.code == 200) {
              this.$message({ type: 'success', message: '删除成功!'});
              this.initial()
            }
          });
        }).catch(() => {
           this.$message.error('删除失败');
        });  
      }else if (this.certain.children.length!=0){
        this.$message.error('请先删除子级菜单');
      }

    },
    ondefine(){
      var parse={
        parentId:this.certain.parentId,
        component: this.form.component,
        icon: this.form.icon,     
        name: this.form.name,     
        // path: this.form.component,     
        // redirect: "", 
        sort: this.form.sort,      
        status: this.form.status,    
        title:this.form.name,    
        type: this.certain.type,     
        url: this.form.url,     
        visible: this.form.visible,    
      }
      if (this.Increase==true) {
        parse.parentId=this.certain.id
        ParkRoleApi(parse).then(r => {
          if (r.code == 200) {
            this.initial()
            this.form={name: '',component:'',sort:'',status:'',visible:'',icon: ''}
          }
        });
      }else{
        parse.id=this.certain.id
        ParkModification(parse).then(r => {
          if (r.code == 200) {
            this.$message({ type: 'success',  message: '修改成功!'});
            this.initial()
          }
        });
      }

    },
    onCancel(){
      this.form={name: '',component:'',sort:'',status:'',visible:'',icon: ''};
      this.initial()
    },
    filterNode(value, purview,node) {
      if (!value) return true;
      return node.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      this.form=data
      this.certain=data
      this.Increase=false
      switch (data.type) {
        case '1':
          this.first='目录'
          this.lopersta=false
          break;
        case '2':
          this.first='菜单'
          this.lopersta=true
          this.website1=true
          this.website2=false
          this.website3=false
          this.layer1=data.name
          break;
        case '3':
          this.first='页面'
          this.lopersta=true
          this.website1=true
          this.website2=true
          this.website3=false
          this.layer2=data.name
          break;
        case '4':
          this.first='按钮'
          this.lopersta=true
          this.website1=true
          this.website2=true
          this.website3=true
          this.layer3=data.name
          break;
        default:
          this.first=''
          break;
      }
    },
  }
};
</script>
<style lang="scss">
.Classified{
  .el-input__inner {
    line-height: 30px;
    height: 30px;
  }
  .el-input__icon {
    line-height: 30px;
  }
}
  .Authority_limits{
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    .el-icon-caret-right:before {
      content: "\e6df" !important;
      font-size: 16px !important;
    }
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      content: "\e6e0" !important;
      font-size: 16px !important;
    }
  }
  
  .upload-demo{
    border: none;
    background-color: #FFFFFF;
  }
</style>
<style  lang="scss" scoped>
.DeveloPer {
  i {
      padding: 0 5px;
    }
  .header_btns {
    height: calc(100vh - 170px) ;
    .Peripheral{
      width: 99%;
      margin-left: 1px;
      background: #FFFFFF;
      border-radius: 5px;
      box-shadow: 0px 0px 3px 0px #98ABC2;
      height: calc(100vh - 250px) ;
      .Peripheral_box{
        background: #F7F8FA;
      }
      .Peripheral_line{
        padding:15px  0px 15px 0;
      }
      .Authority{
        width: 100%;
        height: 91.6%;
        .Authority_limits{
          padding-top: 5px;
          height: 100%;
          padding-left:20px;
          box-shadow: 0px 2px 2px 0px #98ABC2;
        }
        .Authority_range{
          padding: 5% 0 0 10%;
          height: 80%;
          .el-form-item{
            margin-bottom:5px
          }
          
        }
        .DeveloPer_passage{
          height: 20%;
          // border-top: 1px solid #909090;
          margin-left: 1px;
          box-shadow: 0px 0px 2px 0px #98ABC2;
        }
      }
    }
  }
}

</style>
