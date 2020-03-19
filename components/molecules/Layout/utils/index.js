// Reference : https://codepen.io/brandonjdavis/pen/poJPNXb
import $ from 'jquery'

export default function hover (mainClass, orientationClass) {
  $(`.${mainClass}.${orientationClass}`).each(function () {
    const nLi = orientationClass === 'is-horizontal' ? 6 : 9

    // hover "li"
    $(this).find('li').hover(
      // mouse In
      function () {
        if ($('li .selected').length) {
          return
        }

        $(this).toggleClass('hover')

        const scaleFactor = orientationClass === 'is-horizontal' ? 1.8 : 2.8
        const wBigElement = $(this).width() * scaleFactor
        const translation = (wBigElement - $(this).width()) / 2

        const item = $(this).parent().children()

        if (orientationClass === 'is-horizontal') {
          $(this).css('transform', 'scale(' + scaleFactor + ')')
        } else {
          $(this).css('transform', 'scale(' + scaleFactor + ', 1.125)')
        }

        $(this).find('.card-info').css('opacity', 1)
        $(this).find('img').css('opacity', 1)

        if ($(this).is(':nth-child(1)')) {
          item.slice(1, nLi).css('transform', 'translate(' + translation * 2 + 'px,  0px)')
        }

        for (let i = 2; i <= nLi - 1; i++) {
          if ($(this).is(':nth-child(' + i + ')')) {
            item.slice(0, i - 1).css('transform', 'translate(-' + translation + 'px,  0px)')
              .end().slice(i).css('transform', 'translate(' + translation + 'px,  0px)')
          }
        }

        if ($(this).is(':nth-child(' + nLi + ')')) {
          item.slice(0, (nLi - 1)).css('transform', 'translate(-' + translation * 2 + 'px,  0px)')
        }

      // mouse Out
      }, function () {
        $(this).toggleClass('hover')
        $(this).css('transform', 'scale(1)')
        $(this).find('.card-info').css('opacity', 0)
        $(this).find('img').css('opacity', 0)
        $(`.${mainClass} li`).not(this).css('transform', 'translate(0px,  0px)')
      }
    )

    $(this).find('li').click(function () {
      $(this).removeClass('hover')
      $(this).css('transform', 'scale(1)')
      $(this).find('.card-info').css('opacity', 0)
      $(this).find('img').css('opacity', 0)
      $(`.${mainClass} li`).not(this).css('transform', 'translate(0px,  0px)')
    })
  })
}
