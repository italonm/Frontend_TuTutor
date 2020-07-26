<template>
<div>
  <!--==========================
  Header
  ============================-->
  <header id="header">

    <div class="container">

      <div class="logo float-left">
        <!-- Uncomment below if you prefer to use an image logo -->
        <h1 class="text-light"><a href="#intro" class="scrollto"><span>TUTUTOR</span></a></h1>
        <!-- <a href="#header" class="scrollto"><img src="img/logo.png" alt="" class="img-fluid"></a> -->
      </div>

      <nav class="main-nav float-right d-none d-lg-block">
        <ul>
          <li><a @click="iniciarSesion()">Inicia Sesión</a></li>
          <li class="active"><a href="#intro">Principal</a></li>
          <li><a href="#about">Conócenos</a></li>
          <li><a href="#services">Nuestros servicios</a></li>
          <li><a href="#team">El equipo</a></li>
        </ul>
      </nav><!-- .main-nav -->
      
    </div>
  </header><!-- #header -->

  <!--==========================
    Intro Section
  ============================-->
  <section id="intro" class="clearfix">
    <div class="container d-flex h-100;">
      <div class="row justify-content-center align-self-center">
        <div class="col-md-5 intro-info order-md-first order-last" style="top: 50%; transform: translateY(20%);">
          <h2>Lleva las tutorías<br> a otro <span>nivel</span></h2>
          <div class="row justify-content-center align-self-center">
            <a href="#about" class="btn-get-started scrollto" @click="iniciarSesion()" >Comienza</a>
          </div>
        </div>  
        <div class="col-md-7 intro-img order-md-last order-first">
          <img src="img/intro-sw.png" alt="" class="img-fluid">
        </div>
      </div>

    </div>
  </section><!-- #intro -->

  <main id="main">

    <!--==========================
      About Us Section
    ============================-->
    <section id="about">

      <div class="container">
        <div class="row">

          <div class="col-lg-5 col-md-6">
            <div class="about-img">
              <img src="img/about-img.jpg" alt="">
            </div>
          </div>

          <div class="col-lg-7 col-md-6">
            <div class="about-content">
              <h2>TuTutor</h2>
              <h3>Brindamos herramientas que marcan la diferencia </h3>
              <p>Somos una agrupación que se dedica al desarrollo de aplicaciones interactivas que tiene como objetivo facilitar la administración de tutorías a instituciones educativas.</p>
              <p>Contamos con el apoyo de un equipo altamente capacitado para brindar soluciones técnicas y mejorar tu experiencia con nuestros servicios.</p>
              <p>Registrándote como administrador:</p>
              <ul>
                <li><i class="ion-android-checkmark-circle"></i> Podrá configurar su institución</li>
                <li><i class="ion-android-checkmark-circle"></i> Crear y administrar usuarios</li>
                <li><i class="ion-android-checkmark-circle"></i> Gestionar nuevas unidades académicas</li>
              </ul>
              <p>Siempre garantizando la seguridad y confidencialidad de sus datos</p>
            </div>
          </div>
        </div>
      </div>

    </section><!-- #about -->


    <!--==========================
      Services Section
    ============================-->
    <section id="services" class="section-bg">
      <div class="container">

        <header class="section-header">
          <h3>Servicios</h3>
          <p></p>
        </header>

        <div class="row" style="visibility: visible">

          <div class="col-md-6 col-lg-4 wow bounceInUp" data-wow-duration="1.4s" >
            <div class="box" style="visibility: visible">
              <div class="icon" style="background: #fff0da;"><i class="ion-ios-bookmarks-outline" style="color: #e98e06;"></i></div>
              <h4 class="title"><a href="">Gestiona asignaciones</a></h4>
              <p class="description">Los usuarios tendrán la facilidad de crear, aceptar y rechazar asignaciones de tutorías</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 wow bounceInUp" data-wow-delay="0.1s" data-wow-duration="1.4s">
            <div class="box" style="visibility: visible">
              <div class="icon" style="background: #e6fdfc;"><i class="ion-ios-paper-outline" style="color: #3fcdc7;"></i></div>
              <h4 class="title"><a href="">Agenda citas</a></h4>
              <p class="description">Se contará con la facilidad de poder gestionar citas y sincronizarlas con su cuenta de Google Calendar</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 wow bounceInUp" data-wow-duration="1.4s">
            <div class="box" style="visibility: visible">
              <div class="icon" style="background: #fceef3;"><i class="ion-ios-analytics-outline" style="color: #ff689b;"></i></div>
              <h4 class="title"><a href="">Reportes estadísticos</a></h4>
              <p class="description">Reportes a tu medida para evaluar el desempeño de tu institución y sus trabajadores</p>
            </div>
          </div>
        </div>

      </div>
    </section><!-- #services -->

    <!--==========================
      Portfolio Section
    ============================-->
    <section id="portfolio" class="section-bg">
      <div class="container">

        <header class="section-header">
          <h3 class="section-title"> Portafolio</h3>
          <p></p>
        </header>

        <div class="row portfolio-container">

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
              <img src="img/portfolio/app1.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4><a href="#">App 1</a></h4>
                <p>App</p>
                <div>
                  <a href="img/portfolio/app1.jpg" data-lightbox="portfolio" data-title="App 1" class="link-preview" title="Preview"><i class="ion ion-eye"></i></a>
                  <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web" data-wow-delay="0.1s">
            <div class="portfolio-wrap">
              <img src="img/portfolio/web3.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4><a href="#">Web 3</a></h4>
                <p>Web</p>
                <div>
                  <a href="img/portfolio/web3.jpg" class="link-preview" data-lightbox="portfolio" data-title="Web 3" title="Preview"><i class="ion ion-eye"></i></a>
                  <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app" data-wow-delay="0.2s">
            <div class="portfolio-wrap">
              <img src="img/portfolio/app2.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4><a href="#">App 2</a></h4>
                <p>App</p>
                <div>
                  <a href="img/portfolio/app2.jpg" class="link-preview" data-lightbox="portfolio" data-title="App 2" title="Preview"><i class="ion ion-eye"></i></a>
                  <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-wrap">
              <img src="img/portfolio/card2.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4><a href="#">Card 2</a></h4>
                <p>Card</p>
                <div>
                  <a href="img/portfolio/card2.jpg" class="link-preview" data-lightbox="portfolio" data-title="Card 2" title="Preview"><i class="ion ion-eye"></i></a>
                  <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web" data-wow-delay="0.1s">
            <div class="portfolio-wrap">
              <img src="img/portfolio/web2.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4><a href="#">Web 2</a></h4>
                <p>Web</p>
                <div>
                  <a href="img/portfolio/web2.jpg" class="link-preview" data-lightbox="portfolio" data-title="Web 2" title="Preview"><i class="ion ion-eye"></i></a>
                  <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app" data-wow-delay="0.2s">
            <div class="portfolio-wrap">
              <img src="img/portfolio/app3.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4><a href="#">App 3</a></h4>
                <p>App</p>
                <div>
                  <a href="img/portfolio/app3.jpg" class="link-preview" data-lightbox="portfolio" data-title="App 3" title="Preview"><i class="ion ion-eye"></i></a>
                  <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-wrap">
              <img src="img/portfolio/card1.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4><a href="#">Card 1</a></h4>
                <p>Card</p>
                <div>
                  <a href="img/portfolio/card1.jpg" class="link-preview" data-lightbox="portfolio" data-title="Card 1" title="Preview"><i class="ion ion-eye"></i></a>
                  <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card" data-wow-delay="0.1s">
            <div class="portfolio-wrap">
              <img src="img/portfolio/card3.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4><a href="#">Card 3</a></h4>
                <p>Card</p>
                <div>
                  <a href="img/portfolio/card3.jpg" class="link-preview" data-lightbox="portfolio" data-title="Card 3" title="Preview"><i class="ion ion-eye"></i></a>
                  <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web" data-wow-delay="0.2s">
            <div class="portfolio-wrap">
              <img src="img/portfolio/web1.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4><a href="#">Web 1</a></h4>
                <p>Web</p>
                <div>
                  <a href="img/portfolio/web1.jpg" class="link-preview" data-lightbox="portfolio" data-title="Web 1" title="Preview"><i class="ion ion-eye"></i></a>
                  <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section><!-- #portfolio -->

    <!--==========================
      Team Section
    ============================-->
    <section id="team" class="section-bg">
      <div class="container">
        <div class="section-header">
          <h3>EQUIPO</h3>
          <p>Contamos con el mejor equipo de desarrolladores</p>
        </div>

        <div class="row">

          <div class="col-lg-3 col-md-6 wow fadeInUp">
            <div class="member" style="visibility: visible">
              <img src="img/team-1.jpg" class="img-fluid" alt="">
              <div class="member-info">
                <div class="member-info-content">
                  <h4>Melvin Gomez</h4>
                  <span>Coordinador General</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="member" style="visibility: visible">
              <img src="img/team-2.jpg" class="img-fluid" alt="">
              <div class="member-info">
                <div class="member-info-content">
                  <h4>Silvia Antayhua</h4>
                  <span>Lider Técnica</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
            <div class="member" style="visibility: visible">
              <img src="img/team-3.jpg" class="img-fluid" alt="">
              <div class="member-info">
                <div class="member-info-content">
                  <h4>Italo Nuñez</h4>
                  <span>Lider Front</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="member" style="visibility: visible">
              <img src="img/team-4.jpg" class="img-fluid" alt="">
              <div class="member-info">
                <div class="member-info-content">
                  <h4>Juan Diego Villegas</h4>
                  <span>Líder Back</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section><!-- #team -->
    
  </main>

  <!--==========================
    Footer
  ============================-->
  <footer id="footer" class="section-bg">
    <div class="footer-top">
      <div class="container">

        <div class="row">
            
          <div class="col-sm-4">
            <div class="footer-info">
                <h3>TUTUTOR</h3>                    
            </div>
          </div>  

          <div class="col-sm-4">
            <div class="footer-links">
              <h4>Contáctanos</h4>
              <p>
                Lima, Perú<br>
                <strong>Teléfono:</strong> +51 974871926<br>
                <strong>Correo:</strong> tututorstaff@gmail.com<br>
              </p>
            </div>
          </div>

          <div class="col-sm-4">
            <div class="footer-links">
              <h4>Enlaces útiles</h4>
              <ul>
                <li><a href="#">Principal</a></li>
                <li><a href="#">Conócenos</a></li>
                <li><a href="#">Nuestros Servicios</a></li>
              </ul>
            </div>
          </div>                    
          
        </div>

      </div>
    </div>

  </footer><!-- #footer -->

  <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>

</div>

</template>

<script> 
export default {
  data() {
    return { 
    }
  },
  methods: {
    iniciarSesion() {  
      this.$router.push("/Login")
    }          
  },
}
</script>