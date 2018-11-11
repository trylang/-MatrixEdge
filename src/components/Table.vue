<template>
	<div>
		<table cellspacing="0" cellpadding="0" border="0" class="tablebox erp_table">
			<thead class="table_header">
				<tr v-if="header">
          <th v-for="(header,index) in header" :key="index">
            <div class="cell" :class="header.class" :style="header.style">
              {{header.label}}  
              <input v-if="header.type==='checkbox'" type="checkbox" id="checkedAll" :checked="checkedAll" @click="toggleAll(header, content)">							
              <label v-if="header.type==='checkbox'" for="checkedAll"></label>
            </div>
          </th>
				</tr>
			</thead>

			<tbody class="table_body">
        
        <template v-for="(content,index) in content">
          <tr :class="{clickTr: ifClickTr}" @click="ifClickTr?handlerTr(content, index, true):'' ">
            <td v-for="(header,key) in header" :key="key">
              <div class="cell">
                <span v-if="header.type==='text'">{{content[header.name]}}</span>
                <span v-if="header.type==='time'">{{content[header.name]|formatDate(header.filter)}}</span>
                <input v-if="header.type==='checkbox'" type="checkbox" :id="index" v-model="content[header.name]">
                <label v-if="header.type==='checkbox'" :for="index"></label>
                <div v-if="header.type==='buttons'">
                  <div class="btn-item" v-for="(operation, index) in header.operations" :key="index">
                    <a href="#" class="btn_text" v-if="operation.type=='link'" :class="operation.class" 
                      :style="operation.style" 
                      @click.stop.prevent="operation.click(content, content)" 
                      >{{operation.label}}</a>
                    <el-button v-if="operation.type=='btn'" size="mini" :class="operation.class" 
                      :style="operation.style" @click.stop.prevent="operation.click(content, content)" 
                      :type="operation.btntype">{{operation.label}}</el-button>
                    <el-dropdown v-if="operation.type=='dropdown'" @command="operation.handleCommand" trigger="click">
                      <span class="el-dropdown-link">
                        {{operation.label}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(drop, dropItem) in operation.options" :key="dropItem" :command="drop.command">{{drop.label}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>

                  </div>
                    
                </div>                       
              </div>
            </td>
          </tr>

          <transition
            name="custom-classes-transition"
            enter-active-class="animated bounceInRight"
            leave-active-class="animated bounceOutRight">
            <tr v-if="trShow[index]">
              <span @click.stop.prevent="handlerTr(content, index, false)"><i class="el-icon-close"></i></span>
              <slot>
                <div style="height: 200px; border: 1px solid red;">frfrfrfr</div>
              </slot>
            </tr>
            
          </transition>

          
        </template>
        
        <tr v-if="content.length<1" class="table_empty-block">
          <td colspan="7" class="table_empty-text">暂无数据</td>
        </tr>

			</tbody>
      
	  </table>

    <div v-if="!noPage && content.length>0" class="table_page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="1"
        layout="prev, pager, next, jumper"
        :total="content.length">
      </el-pagination>
    </div>
	</div>
	
	
</template>

<script>
export default {
  name: "Table",
  props: ["header", "content", "noPage", "ifClickTr"],
  data() {
    return {
      currentPage: 1,
      trShow: Array(this.content.length)
    }
  },
  computed: {
    checkedAll: function() {
      if (this.content.length <= 0) return false; 
      const checkName = this.header.find(item => item.type === "checkbox")
        .name;
      return this.content.every(item => {
        return item[checkName];
      });
    }
  },
  methods: {
    toggleAll: (header, content) => {
      const checkName = [header].find(item => item.type === "checkbox").name;
      const ifChecked = content.every(item => {
        return item[checkName];
      });
      if (ifChecked) {
        content.forEach(element => {
          element[checkName] = false;
        });
      } else {
        content.forEach(element => {
          element[checkName] = true;
        });
      }
      console.log(ifChecked);
      console.log(content);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handlerTr(content, index, flag) {
      this.trShow.splice(index, 1, flag);
    }
  }
};
</script>

<style lang="scss" scoped>
.erp_table {
  width: 100%;
  padding: 1.5rem 0;
  thead {
    color: #909399;
    font-weight: 500;
    th {
      background-color: #e4e4e4;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      user-select: none;
      text-align: left;
      .cell {
        padding: .6rem;
      }
    }
  }
  tbody {
    .cell {
      padding: .6rem;
      .btn-item {
        display: inline-block;
        padding-right: 10px;
      }
    }
    .table_empty-block {
      min-height: 60px;
      text-align: center;
      .table_empty-text {
        padding: 1rem;
        color: #909399;
      }
    }
  }
  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]+label {
    display: inline-block;
    width: 48%;
    margin-top: 10px;
    margin-left: 5px;
    text-align: left;
  }

  label::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 2px;
    margin-right: 5px;
    transition: background ease-in .3s;
  }

  input[type="checkbox"]:checked+label::before {
    content: '\2713';
    color: #fff;
    font-size: 10px;
    text-align: center;
    // vertical-align: middle;
    background-color: #409eff;
    border: 1px solid #409eff;
  }
}

.table_page {
  display: flex;
  justify-content: center;
}
.clickTr {
  cursor: pointer;
}
</style>