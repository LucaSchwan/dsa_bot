module.exports = async (message, args, db) => {
  var n;

  if(!isNaN(args[0]) && (args[1] === 'GD' || args[1] === 'ST' || args[1] === 'BH' || args[1] === 'EK')) {
    // eslint-disable-next-line no-undef
    db.query('SELECT * FROM DSAGeld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
      if(row && err) {
        message.reply('Es gab einen Fehler.');
      }
      if(!row) { //if the user is not in the database
        message.reply('Es existiert kein Eintrag für dich füge ihn mit !create hinzu.');
      } else { //if the user is in the database
        
        if(args[1] === 'GD') {
          n = parseInt(row[0].GD, 10) - parseInt(args[0], 10);
        } else if(args[1] === 'ST') {
          n = parseInt(row[0].ST, 10) - parseInt(args[0], 10);
        } else if(args[1] === 'BH') {
          n = parseInt(row[0].BH, 10) - parseInt(args[0], 10);
        } else if(args[1] === 'EK') {
          n = parseInt(row[0].EK, 10) - parseInt(args[0], 10);
        }
              
        if(n >= 0) {
          // eslint-disable-next-line no-undef
          db.query('UPDATE DSAGeld SET' + '`' + args[1] + '`' + ' = (' + n + ') WHERE userName = ' + '"' + message.author.tag + '"');
          // eslint-disable-next-line no-undef
          db.query('SELECT * FROM DSAGeld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
            message.reply(args[0] + args[1] + ' abgezogen, du hast: ' + row[0].GD + 'GD, ' + row[0].ST + 'ST, ' + row[0].BH + 'BH, ' + row[0].EK + 'EK.');
          });
        } else if(n < 0) {
          message.reply('du hast nicht genügend ' + args[1] );
        }    
      }
    });
  }
};