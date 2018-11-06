<template>
  <div class="drawer">
    <button @click="toggleBtn">点一下</button>
    <div class="content" :class="[!show? '': (show=='show' ? 'come' : 'go')]">
      <h1>hahahaha</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drawer',
  data() {
    return {
      show: ''
    }
  },
  methods: {
    toggleBtn() {
      if (!this.show) this.show = 'show';
      else if (this.show == 'show') this.show = 'hide';
      else if (this.show == 'hide') this.show = 'show';
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .drawer { 
    position: fixed;
    top: 0;
    right: 0;
    
    .content {
      position: fixed;
      right: -300px;
      width: 300px;
      height: 100%;
      background: #eee;
      opacity: .4;
    }

    .come {
      -webkit-animation:come 1s ease-in-out 0s 1 alternate forwards;
    }

    .go {
      -webkit-animation:go 1s ease-in-out 0s 1 alternate forwards;
    }
    
  }

  @-webkit-keyframes come{	
		from {
			opacity : 0;			
			right:-300px;
    }
    to {
			opacity: 1;
			right:0;
		}
  }
  
  @-webkit-keyframes go{		
    from {
			opacity: 1;
			right:0;
    }
    to {
			opacity : 0;			
			right:-300px;
    }
	}
  
</style>


