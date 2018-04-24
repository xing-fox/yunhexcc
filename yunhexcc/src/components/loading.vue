<template>
<div class="loading">
  <div class="loading-dot"></div>
  <div class="loading-dot"></div>
  <div class="loading-dot"></div>
  <div class="loading-dot"></div>
</div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style>
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -24px 0 0 -42px;
  padding: 36px 10px;
  background: rgba(20, 20, 20, .3);

  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  box-sizing: border-box;
}

.loading-dot {
  float: left;
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background: white;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  opacity: 0;
  -webkit-animation: loadingFade 1s infinite;
  -moz-animation: loadingFade 1s infinite;
  animation: loadingFade 1s infinite;
}

.loading-dot:nth-child(1) {
  -webkit-animation-delay: 0s;
  -moz-animation-delay: 0s;
  animation-delay: 0s;
}

.loading-dot:nth-child(2) {
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.loading-dot:nth-child(3) {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.loading-dot:nth-child(4) {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

@-webkit-keyframes loadingFade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}

@keyframes loadingFade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}
</style>
