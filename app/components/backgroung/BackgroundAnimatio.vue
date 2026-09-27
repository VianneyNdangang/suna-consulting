<template>
  <div class="relative w-full overflow-hidden">

    <!-- Cercles -->
    <div class="circle circle1"></div>
    <div class="circle circle2"></div>
    <div class="circle circle3"></div>
    <div class="circle circle4"></div>

    <!-- Contenu -->
    <div class="relative z-10 flex items-center justify-center min-h-screen md:min-h-full">
      <slot/>
    </div>

  </div>
</template>

<style scoped>
.circle {
  position: absolute;
  border-radius: 9999px;
  filter: blur(30px);
  opacity: 0.12;
  animation: float 35s ease-in-out infinite alternate;
}

/* Cercle 1 */
.circle1 {
  width: 450px;
  height: 500px;
  background: #c79e46;
  top: -100px;
  left: -150px;
}

/* Cercle 2 */
.circle2 {
  width: 700px;
  height: 700px;
  background: #ffffff;
  bottom: -250px;
  right: -150px;
  animation-duration: 45s;
}

/* Cercle 3 */
.circle3 {
  width: 350px;
  height: 350px;
  background: #8b5e34;
  top: 40%;
  left: 60%;
  animation-duration: 50s;
}

/* Cercle 4 */
.circle4 {
  width: 600px;
  height: 600px;
  background: #c79e46;
  top: 20%;
  right: 35%;
  animation-duration: 60s;
}

@keyframes float {

  0% {
    transform: translate(0, 0) scale(1);
  }

  25% {
    transform: translate(80px, -50px) scale(1.08);
  }

  50% {
    transform: translate(-60px, 60px) scale(0.95);
  }

  75% {
    transform: translate(100px, 30px) scale(1.05);
  }

  100% {
    transform: translate(-80px, -40px) scale(1);
  }
}
</style>